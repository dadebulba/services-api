import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { VersionsService } from './versions.service';
import { CreateUpdateVersionDTO } from './models/version';
import { ApiKeyGuard } from './guards/api-key.guard';

@Controller('versions')
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) { }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const versionId = parseInt(id);
    if (isNaN(versionId)) {
      throw new BadRequestException('Invalid versionId ID');
    }
    return await this.versionsService.getVersionById(versionId) 
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createUpdateVersionDTO: CreateUpdateVersionDTO)  {
    return await this.versionsService.createVersion(createUpdateVersionDTO)

  }

  @Put(':id')
  @UseGuards(ApiKeyGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  async update(@Param('id') id: string, @Body() createUpdateVersionDTO: CreateUpdateVersionDTO) {
    const versionId = parseInt(id);
    if (isNaN(versionId)) {
      throw new BadRequestException('Invalid versionId ID');
    }
    return await this.versionsService.updateVersion(versionId, createUpdateVersionDTO)
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  async remove(@Param('id') id: string) {
    const versionId = parseInt(id);
    if (isNaN(versionId)) {
      throw new BadRequestException('Invalid version ID');
    }
    return await this.versionsService.deleteVersion(versionId)
  }

}

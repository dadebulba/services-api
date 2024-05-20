import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUpdateServiceDTO } from './models/service';
import { ServicesService } from './services.service';
import { ApiKeyGuard } from './guards/api-key.guard';
import { FindAllQueryDTO } from './models/query';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  async findAll(@Query() query: FindAllQueryDTO) {
    return await this.servicesService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const serviceId = parseInt(id, 10);
    if (isNaN(serviceId)) {
      throw new BadRequestException('Invalid service ID');
    }
    return await this.servicesService.getServiceById(+id)
  }

  @Get(':id/versions')
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  async findAllVersions(@Param('id') id : string,@Query() query: FindAllQueryDTO) {
    const serviceId = parseInt(id);
    if (isNaN(serviceId)) {
      throw new BadRequestException('Invalid service ID');
    }
    return await this.servicesService.findAllVersions(id, query)
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() createServiceDTO: CreateUpdateServiceDTO) {
    return await this.servicesService.createService(createServiceDTO)

  }

  @Put(':id')
  @UseGuards(ApiKeyGuard)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  async update(@Param('id') id: string, @Body() updateServiceDto: CreateUpdateServiceDTO) {
    const serviceId = parseInt(id);
    if (isNaN(serviceId)) {
      throw new BadRequestException('Invalid service ID');
    }
    return await this.servicesService.updateService(serviceId, updateServiceDto)
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  async remove(@Param('id') id: string) {
    const serviceId = parseInt(id);
    if (isNaN(serviceId)) {
      throw new BadRequestException('Invalid service ID');
    }
    return await this.servicesService.deleteService(serviceId)
  }

}

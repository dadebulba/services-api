import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from './entities/version.entity';
import { CreateUpdateVersionDTO } from './models/version';
import { Service } from './entities/service.entity';

@Injectable()
export class VersionsService {
    constructor(@InjectRepository(Version)
    private versionRepository: Repository<Version>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>) { }

    async createVersion(createUpdateVersionDTO: CreateUpdateVersionDTO): Promise<Version> {
        const service = await this.serviceRepository.findOne(createUpdateVersionDTO.service);
        if (!service) {
            throw new BadRequestException('Specified service not valid');
        }
        const newVersion = this.versionRepository.create({ 
            name: createUpdateVersionDTO.name, 
            description: createUpdateVersionDTO.description, 
            service: service
        });
        return await this.versionRepository.save(newVersion);
    }

    async updateVersion(id: number, createUpdateVersionDTO: CreateUpdateVersionDTO): Promise<Version> {
        const version = await this.versionRepository.findOne(id);
        if (!version) {
            throw new BadRequestException('Specified version not found');
        }
        const service = await this.serviceRepository.findOne(createUpdateVersionDTO.service);
        if (!service) {
            throw new BadRequestException('Specified service not found');
        }
        version.name = createUpdateVersionDTO.name;
        version.description = createUpdateVersionDTO.description;
        version.service = service
        return await this.versionRepository.save(version);
    }

    async getVersionById(id: number): Promise<Version> {
        const version = await this.versionRepository.findOne(id);
        if (!version) {
            throw new BadRequestException('Specified version not found');
        }
        return version
    }

    async deleteVersion(id: number): Promise<boolean> {
        const deleteResult = await this.versionRepository.delete(id);
        return deleteResult.affected !== 0; // Returns true if the version was deleted
    }
}

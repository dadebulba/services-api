import { BadRequestException, Injectable } from '@nestjs/common';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from './entities/version.entity';
import { CreateUpdateServiceDTO } from './models/service';
import { FindAllQueryDTO } from './models/query';

@Injectable()
export class ServicesService {
    constructor(@InjectRepository(Service)
    private serviceRepository: Repository<Service>,
        @InjectRepository(Version)
        private versionRepository: Repository<Version>) { }

    async findAll(params: FindAllQueryDTO) {

        let services = []
        let total = 0

        let offset = params.offset ?? 0
        let limit = params.limit ?? 12
        let sort = params.sort ?? 'id'
        let order = params.order ?? 'ASC'

        if (params.search) {
            [services, total] = await this.serviceRepository
                .createQueryBuilder('service')
                .where('service.name LIKE :keyword OR service.description LIKE :keyword', { keyword: `%${params.search}%` })
                .leftJoinAndSelect('service.versions', 'version')
                .select(['service', 'version.id'])
                .take(limit)
                .skip(offset)
                .orderBy(`service.${sort}`, order)
                .getManyAndCount();
        }
        else {
            [services, total] = await this.serviceRepository
                .createQueryBuilder('service')
                .leftJoinAndSelect('service.versions', 'version')
                .select(['service', 'version.id'])
                .take(limit)
                .skip(offset)
                .orderBy(`service.${sort}`, order)
                .getManyAndCount();
        }


        for (const service of services) {
            service.versions = service.versions.map(v => v.id)
        }

        return {
            items: services,
            offset: offset + services.length,
            total: total
        }
    }

    async findAllVersions(id: string, params: FindAllQueryDTO): Promise<{items: Version[], offset: number, total: number}> {
        let offset = params.offset ?? 0
        let limit = params.limit ?? 10
        let sort = params.sort ?? 'id'
        let order = params.order ?? 'ASC'
        let _id = parseInt(id)

        const service = await this.serviceRepository.findOne(id);
        if (!service) {
            throw new BadRequestException('Specified service not found');
        }
        const [versions, total] = await this.versionRepository
            .createQueryBuilder('version')
            .select('version')
            .where(`"${"version"}".service_id = :id`, { id: _id })
            .take(limit)
            .skip(offset)
            .orderBy(`version.${sort}`, order)
            .getManyAndCount();

        return {
            items: versions,
            offset: offset + versions.length,
            total: total
        }
    }

    async createService(createServiceDTO: CreateUpdateServiceDTO): Promise<Service> {
        const newService = this.serviceRepository.create({
            name: createServiceDTO.name,
            description: createServiceDTO.description
        });
        return await this.serviceRepository.save(newService);
    }

    async updateService(id: number, updateServiceDTO: CreateUpdateServiceDTO): Promise<Service> {
        const service = await this.serviceRepository.findOne(id);
        if (!service) {
            throw new BadRequestException('Specified service not found');
        }
        service.name = updateServiceDTO.name;
        service.description = updateServiceDTO.description;
        return await this.serviceRepository.save(service);
    }

    async getServiceById(id: number): Promise<Service> {
        const service = await this.serviceRepository.findOne(id, { loadRelationIds: true });
        if (!service) {
            throw new BadRequestException('Specified service not found');
        }
        return service
    }

    async deleteService(id: number): Promise<boolean> {
        const deleteResult = await this.serviceRepository.delete(id);
        return deleteResult.affected !== 0;
    }

}

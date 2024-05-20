import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { Version } from './entities/version.entity';
import { VersionsController } from './versions.controller';
import { VersionsService } from './versions.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Service,Version]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      schema: process.env.POSTGRES_SCHEMA,
      entities: [Service, Version],
      synchronize: false
    }),
  ],
  controllers: [ServicesController, VersionsController],
  providers: [ServicesService, VersionsService],
})
export class AppModule {}

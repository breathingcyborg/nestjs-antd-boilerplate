import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {

    constructor(private readonly configService : ConfigService) {}

    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
        return this.configService.getOrThrow<DataSourceOptions>('database');
    };
} 
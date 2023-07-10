import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { PropertiesController } from "./controller/properties.controller";
import { Property } from "./entities/property.entity";
import { PropertyCrudService } from "./services/property-crud.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ Property, User ]),
    ],
    providers: [ PropertyCrudService ],
    controllers: [ PropertiesController ],
})
export class PropertyModule {}
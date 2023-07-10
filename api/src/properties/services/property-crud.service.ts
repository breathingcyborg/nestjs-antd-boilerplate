import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { toTypeormSortOrder } from "../../common/utils/common";
import { Repository } from "typeorm";
import { GenericIDResponse } from "../../common/dtos/generic-id-response.dto";
import { CreateProperty } from "../dtos/create-property.dto";
import { ListPropertyRequest } from "../dtos/list-property-request.dto";
import { ListPropertyResponse } from "../dtos/list-property-response.dto";
import { UpdateProperty } from "../dtos/update-property.dto";
import { Property } from "../entities/property.entity";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class PropertyCrudService {

    constructor(
        @InjectRepository(Property)
        private readonly repo: Repository<Property>,
        @InjectRepository(User)
        private readonly userRepo : Repository<User>,
    ) { }

    async index(request: ListPropertyRequest) {

        const qb = this.repo.createQueryBuilder("property")
            .limit(request.limit)
            .offset(request.offset)
            .leftJoinAndSelect('property.user', 'user')
            .orderBy(`property.${request.sortField}`, toTypeormSortOrder(request.sortOrder));

        if (request.title) {
            qb.andWhere("property.title LIKE :title", {
                title: `%${request.title}%`,
            })
        }

        if (request.listingType) {
            qb.andWhere("property.listingType LIKE :listingType", {
                listingType: `%${request.listingType}%`,
            })
        }

        if (request.propertyType) {
            qb.andWhere("property.propertyType LIKE :propertyType", {
                propertyType: `%${request.propertyType}%`,
            })
        }

        const [data, total] = await qb.getManyAndCount();

        return new ListPropertyResponse({
            data,
            total,
            success: true,
        });
    }

    async create(request: CreateProperty) {
        const user = await this.userRepo.findOneBy({ id: request.userId });
        if (!user) {
            throw new BadRequestException('invalid user');
        }

        delete request.userId;
        const property = this.toEntity(request);
        property.setCoords(request.lat, request.lng);

        property.user = user;

        await this.repo.save(property);

        return new GenericIDResponse(property.id);
    }

    async update(id: string, request: UpdateProperty) {

        let property = await this.repo.findOneBy({ id });
        if (!property) {
            throw new NotFoundException("property not found");
        }

        const user = await this.userRepo.findOneBy({ id: request.userId });
        if (!user) {
            throw new BadRequestException('invalid user');
        }

        delete request.userId;
        const newProperty = this.toEntity(request);
        newProperty.setCoords(request.lat, request.lng);
        newProperty.id = property.id;
        newProperty.createdAt = property.createdAt;
        newProperty.updatedAt = property.updatedAt;
        newProperty.user = user;

        await this.repo.save(newProperty);
    }

    async findById(id: string) {
        let property = await this.repo.findOne({
            where: { id },
            relations: {
                user: true,
            }
        });
        if (!property) {
            throw new NotFoundException("property not found");
        }
        return property;
    }

    private toEntity(dto: CreateProperty | UpdateProperty) {
        return plainToInstance(Property, instanceToPlain(dto));
    }
}
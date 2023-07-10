import { Body, Controller, Get, Param, Patch, Post, Query, SerializeOptions } from "@nestjs/common";
import { UserRole } from "src/users/entities/user.entity";
import { Auth } from "../../auth/decorators/auth.decorator";
import { GenericIDResponse } from "../../common/dtos/generic-id-response.dto";
import { CreateProperty } from "../dtos/create-property.dto";
import { ListPropertyRequest } from "../dtos/list-property-request.dto";
import { ListPropertyResponse } from "../dtos/list-property-response.dto";
import { PropertyRead } from "../dtos/property-read.dto";
import { UpdateProperty } from "../dtos/update-property.dto";
import { PropertyCrudService } from "../services/property-crud.service";

@Controller("/admin/properties")
@Auth([ UserRole.Admin ])
export class PropertiesController {

    constructor(
        private readonly service : PropertyCrudService,
    ) {}

    @Get("")
    @SerializeOptions({ type: ListPropertyResponse })
    index(
        @Query() request : ListPropertyRequest
    ) : Promise<ListPropertyResponse> {
        return this.service.index(request);
    }
    
    @Post("")
    create(
        @Body() request : CreateProperty
    ) : Promise<GenericIDResponse> {
        return this.service.create(request);
    }

    @Get(":id")
    @SerializeOptions({ type: PropertyRead })
    async findById(
        @Param("id") id: string
    ) : Promise<PropertyRead> {
        return this.service.findById(id);
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() request : UpdateProperty
    ) {
        await this.service.update(id, request);
    }
}
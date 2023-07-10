import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class PaginationRequest {

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    page?: number = 1;
  
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    perPage?: number = 10;

    get limit() {
      return this.perPage;
    }
  
    get offset() {
      return (this.page - 1) * this.perPage;
    }
}
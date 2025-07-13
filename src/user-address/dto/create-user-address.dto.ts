import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateUserAddressDto {

    @IsString()
    region: string;
    
    @IsString()
    district: string;
    

}

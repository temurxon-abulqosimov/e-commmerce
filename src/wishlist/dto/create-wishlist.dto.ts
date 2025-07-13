import { Type } from "class-transformer";
import { IsNumber } from "class-validator";


export class CreateWishlistDto {

    @IsNumber()
    @Type(() => Number)
    productId: number;

}

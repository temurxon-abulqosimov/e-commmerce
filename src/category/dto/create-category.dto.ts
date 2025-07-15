import { IsArray, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    name: string;

    @IsString()
    icon: string;

    @IsArray()
    productsIds: number[];
}

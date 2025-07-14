import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    title: string;
    
    @IsString()
    description: string;

    @IsString()
    imgUrl: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;

    @IsArray()
    @IsOptional()
    commentsIds: number[];

    @IsArray()
    categoriesIds: number[];

    @IsArray()
    userIds: number[];
}


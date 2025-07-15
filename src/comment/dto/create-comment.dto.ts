import { IsArray, IsString } from "class-validator";

export class CreateCommentDto {
    @IsString()
    text: string;

    @IsArray()
    productIds: number[];

}

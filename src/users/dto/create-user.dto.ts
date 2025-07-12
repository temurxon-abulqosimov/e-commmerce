import { Address } from "cluster";
import { gender} from "../entities/user.entity";
import { IsDate, IsOptional, IsString, Matches } from "class-validator";

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
    SELLER = 'seller',
}

export class CreateUserDto {

    @IsString()
    name: string;


    @IsString()
    surname: string;

    @IsString()
    email: string;


    @Matches(/^\+?998([ -])?(90|91|93|94|95|98|99|33|97|71)([ -])?\d{3}([ -])?\d{2}([ -])?\d{2}$/, {
        message: 'Phone number must be a valid Uzbek number starting with +998',
    })
    phone: string;

    @IsString()
    @IsOptional()
    role: UserRole = UserRole.USER;


    @IsDate()
    dateOfBirth: Date;

    @IsString()
    gender: gender;


    @IsString()
    address: Address;


}

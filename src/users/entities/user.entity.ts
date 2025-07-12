import { UserAddress } from "src/user-address/entities/user-address.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../dto/create-user.dto";

export enum gender{
    Male='male',
    Female='female'

}


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:number

    @Column({ length: 100 })
    name: string;

    @Column()
    surname: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column({ type: 'date' })
    dateOfBirth: Date;

    @Column({ length: 100 })
    gender: gender;
    
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role:UserRole


    @OneToOne( () => UserAddress, (address) => address.userId)
    @JoinColumn()
    addressId: number;


    cartId: number;


    wishlistId: number;


    orderId: number;
    
}

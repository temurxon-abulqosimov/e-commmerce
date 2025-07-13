import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserAddress {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    region: string;

    @Column({ length: 100 })
    district: string;

    @OneToOne(() => User, (user) => user.address)
    user: User;

}

import { User } from "src/users/entities/user.entity";
import { Column, OneToOne } from "typeorm";

export class UserAddress {

    @Column({ length: 100 })
    region: string;

    @Column({ length: 100 })
    district: string;

    @OneToOne(() => User, (user) => user.address)
    user: User;

}

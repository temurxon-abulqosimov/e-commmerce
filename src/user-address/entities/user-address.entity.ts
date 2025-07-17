import { Order } from "src/order/entities/order.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToOne(() => Order, (order) => order.address)
    order: Order

}

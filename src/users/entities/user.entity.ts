import { UserAddress } from "src/user-address/entities/user-address.entity";
import { Column, Entity, JoinColumn, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../dto/create-user.dto";
import { Wishlist } from "src/wishlist/entities/wishlist.entity";
import { Product } from "src/product/entities/product.entity";
import { Order } from "src/order/entities/order.entity";
import { Payment } from "src/payment/entities/payment.entity";
import { Cart } from "src/cart/entities/cart.entity";

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

    @Column({ length: 100 }) // select false prevents password from being returned in queries
    password: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column({ type: 'date' })
    dateOfBirth: Date;

    @Column({ length: 100 })
    gender: gender;
    
    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role:UserRole


    @OneToOne(() => UserAddress, (address) => address.user, { eager: true }) // eager loading to automatically load address with user
    @JoinColumn({ name: 'addressId' }) // This sets the foreign key column in User table
    address: UserAddress;

    
    @OneToOne(() => Cart, (cart) => cart.user) // eager loading to automatically load cart with user
    cart: Cart;


    @OneToOne(() => Wishlist, (wishlist) => wishlist.user)
    wishlist: Wishlist;


    @OneToMany(() => Order, (order) => order.user, { eager: true }) // eager loading to automatically load orders with user
    orders: Order[];

    @OneToMany( () => Product, (product) => product.user, { eager: true })
    products: Product[];

    @OneToOne(() => Payment, (payment) => payment.user)
    payment: Payment
    
}

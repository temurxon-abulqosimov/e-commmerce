import { CartItem } from "src/cart-item/entities/cart-item.entity";
import { Category } from "src/category/entities/category.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { OrderItem } from "src/order-item/entities/order-item.entity";
import { User } from "src/users/entities/user.entity";
import { Column, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    title: string;
    
    @Column()
    description: string;

    @Column()
    imgUrl: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @OneToMany(() => Comment, comment => comment.product)
    comments: Comment[]
    
    @ManyToMany(() => Category, category => category.products)
    @JoinTable()
    categories : Category[]

    @ManyToOne(() => User, user => user.products)
    user : User

    @OneToOne(() => CartItem, cartItem => cartItem.product, { eager: true })
    cartItem: CartItem

    @OneToMany(() => OrderItem, orderItem => orderItem.product )
    orderItem: OrderItem[]
}

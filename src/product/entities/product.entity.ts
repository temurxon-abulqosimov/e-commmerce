import { Category } from "src/category/entities/category.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Column, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
}

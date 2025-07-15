import { Product } from "src/product/entities/product.entity";
import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    icon : string;

    @ManyToMany(() => Product, product => product.categories)
    products : Product[]
}

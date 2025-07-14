import { Product } from "src/product/entities/product.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(() => Product, product => product.comments)
    product: Product
}

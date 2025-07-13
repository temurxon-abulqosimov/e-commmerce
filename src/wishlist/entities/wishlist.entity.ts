import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wishlist {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( )
    userId: number;

    @Column()
    productId: number;
}



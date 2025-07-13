import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wishlist {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.wishlist, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    productId: number;
}



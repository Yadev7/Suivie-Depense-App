import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    name: String;

    @Column({ unique: true })
    email: String;

    @Column({ nullable: true })
    password: string;

}
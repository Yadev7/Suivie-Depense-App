import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'revenus' })
export class Revenu {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    dateRevenu: Date;

    @Column({ nullable: true })
    typeRev: String;

    @Column({ nullable: true })
    description: String;

    @Column({ nullable: true })
    montant: Number;

    @Column({ nullable: true })
    docJustificatif: String;

    @Column({ nullable: true })
    audioExplicatif: String;

    @Column({ nullable: true })
    projet_ref: String;

}
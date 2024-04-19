import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'depenses' })
export class Depense {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    dateDep: Date;

    @Column({ nullable: true })
    typeDep: String;

    @Column({ nullable: true })
    description: String;

    @Column({ nullable: true })
    montant: Number;

    @Column({ nullable: true })
    docJustificatif: String;

    @Column({ nullable: true })
    audioExplicatif: String;

    @Column({ nullable: true })
    recordedAudio: String;

    @Column({ nullable: true })
    projet_ref: String;

    @Column({ nullable: true })
    modePaiement: String;
}
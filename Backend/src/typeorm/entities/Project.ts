import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'projects' })
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    ref: String;

    @Column({ nullable: true })
    nomProject: String;

    @Column({ nullable: true })
    description: String;

    @Column({ type: 'date' })
    date_debut: Date;
    
    @Column({ type: 'date' })
    date_fin: Date;

    @Column({ nullable: true })
    tauxRealisation: Number;

    @Column({ nullable: true })
    phase_project: String;

    @Column({ nullable: true })
    duration: Number;

}
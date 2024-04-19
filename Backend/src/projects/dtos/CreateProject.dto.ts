export class CreateProjectDto {
    id: number;
    ref: String;
    nomProject: String;
    description: String;
    date_debut: Date;
    date_fin: Date;
    tauxRealisation: Number;
    phase_project: String;
    duration: Number;
}
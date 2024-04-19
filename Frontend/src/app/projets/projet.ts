export class Project {
    id: number;
    ref: number;
    nomProject: String;
    description: String;
    date_debut: Date;
    date_fin: Date;
    phase_project: String;
    tauxRealisation: Number;
    duration: Number;

    constructor() {
        this.id = 0;
        this.ref = 0;
        this.nomProject = '';
        this.description = '';
        this.date_debut = new Date();
        this.date_fin = new Date();
        this.phase_project = '';
        this.tauxRealisation = 0;
        this.duration = 0;
    }
}

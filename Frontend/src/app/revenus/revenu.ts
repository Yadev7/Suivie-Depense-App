export class Revenu {
    id: number;
    typeRev: String;
    dateRevenu: Date;
    description: String;
    montant: Number;
    docJustificatif: String;
    audioExplicatif: String;
    projet_ref: String;


    constructor() {
        this.id = 0;
        this.dateRevenu = new Date();
        this.typeRev = '';
        this.description = '';
        this.montant = 0;
        this.docJustificatif = '';
        this.audioExplicatif = '';
        this.projet_ref = '';

    }
}

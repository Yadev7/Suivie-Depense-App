export class Depense {
    id: number;
    dateDep: Date;
    typeDep: String;
    description: String;
    montant: Number;
    docJustificatif: String;
    audioExplicatif: String;
    recordedAudio: String;
    projet_ref: String;
    modePaiement: String;

    constructor() {
        this.id = 0;
        this.dateDep = new Date();
        this.typeDep = '';
        this.description = '';
        this.montant = 0;
        this.docJustificatif = '';
        this.audioExplicatif = '';
        this.recordedAudio = '';
        this.projet_ref = '';
        this.modePaiement = '';
    }
}

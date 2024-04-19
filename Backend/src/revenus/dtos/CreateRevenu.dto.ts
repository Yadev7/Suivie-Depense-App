export class CreateRevenuDto {
    id: number;
    dateRevenu: Date;
    typeRev: String;
    description: String;
    montant: Number;
    docJustificatif: String;
    audioExplicatif: String;
    projet_ref: String;
}
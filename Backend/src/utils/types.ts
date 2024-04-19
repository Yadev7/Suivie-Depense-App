
export class CreateProjectParams {
    ref: String;
    nomProject: String;
    description: String;
    date_debut: Date;
    date_fin: Date;
    tauxRealisation: Number;
    phase_project: String;
    duration: Number;
}

export class CreateDepenseParams {
    dateDep: Date;
    typeDep: String;
    description: String;
    montant: String;
    docJustificatif: String;
    audioExplicatif: String;
    recordedAudio: String;
    projet_ref: String;
    modePaiement: String;
}

export class CreateRevenuParams {
    dateRevenu: Date
    typeRev: String
    description: String
    montant: Number
    docJustificatif: String
    audioExplicatif: String
    projet_ref: String
}

export class CreateUserParams {
    name: String;
    email:String;
    password: String;
}

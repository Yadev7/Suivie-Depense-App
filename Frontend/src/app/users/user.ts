export class User {
    id: number;
    nom: String;
    prenom: String;
    email: String;
    password: String;
    role: String;
    constructor() {
        this.id = 0;
        this.nom = '';
        this.prenom = '';
        this.email = '';
        this.password = '';
        this.role = '';
    }
}

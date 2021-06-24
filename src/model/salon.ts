import {Utilisateur} from "./utilisateur";
import {Combat} from "./combat";

export class salon {
  id: number;
  version: number;
  nom: string;
  motDePasse: string;

  joueur1: Utilisateur;
  joueur2: Utilisateur;
  combats: Array<Combat> = new Array<Combat>();

  constructor(id?: number, version?: number, nom?: string, motDePasse?: string) {
    this.id=id;
    this.version=version;
    this.nom=nom;
    this.motDePasse=motDePasse;
  }

}

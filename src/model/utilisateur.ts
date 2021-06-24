import {Statistique} from "./statistique";
import {Equipe} from "./equipe";
import {Salon} from "./salon";

export class Utilisateur {
  id: number;
  pseudo: string;
  email: string;
  avatar: string;
  motDePasse: string;
  statistique: Statistique;
  salons: Array<Salon> = new Array<Salon>();
  equipeSauvegardees: Array<Equipe> = new Array<Equipe>();
  derniereEquipe: Equipe;
  equipeEnCours: Equipe;

  constructor(id?: number, pseudo?: string, email?: string, avatar?: string, motDePasse?: string, statistique?: Statistique) {
    this.id = id;
    this.pseudo = pseudo;
    this.email = email;
    this.avatar = avatar;
    this.motDePasse = motDePasse;
    this.statistique = statistique;
  }
}

import {Salon} from "./Salon";
import {Tour} from "./tour";

export class Combat{
  id: number;
  version: number;
  idUtilisateurGagnant: string;

  salon: Salon;
  tours: Array<Tour> = new Array<Tour>();
  equipe1: Equipe;
  equipe2: Equipe;

  constructor(id?: number, version?: number, idUtilisateurGagnant?: string) {
    this.id=id;
    this.version=version;
    this.idUtilisateurGagnant=idUtilisateurGagnant;
  }
}

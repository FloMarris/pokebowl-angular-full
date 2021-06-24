
import {Tour} from "./tour";
import {Equipe} from "./equipe";
import {Salon} from "./salon";

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

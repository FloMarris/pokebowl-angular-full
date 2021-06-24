import {MonPokemon} from "./mon-pokemon";

export class Equipe {

  id: number;
  version: number;
  numero: number;
  nom: string;
  favorite: boolean;
  nbrPokemons: number;
  utilisateurEquipeSauv: Utilisateur;
  utilisateurDerniereEquipe: Utilisateur;
  utilisateurEquipeEnCours: Utilisateur;
  listPokemons: Array<MonPokemon> = new Array<MonPokemon>();

  constructor(id?: number, version?: number, numero?: number, nom?: string, favorite?: boolean, nbrPokemons?: number, utilisateurEquipeSauv?: Utilisateur, utilisateurDerniereEquipe?: Utilisateur, utilisateurEquipeEnCours?: Utilisateur, listPokemons?: Array<MonPokemon>) {
    this.id = id;
    this.version = version;
    this.numero = numero;
    this.nom = nom;
    this.favorite = favorite;
    this.nbrPokemons = nbrPokemons;
    this.utilisateurEquipeSauv = utilisateurEquipeSauv;
    this.utilisateurDerniereEquipe = utilisateurDerniereEquipe;
    this.utilisateurEquipeEnCours = utilisateurEquipeEnCours;
    this.listPokemons = listPokemons;
  }

}

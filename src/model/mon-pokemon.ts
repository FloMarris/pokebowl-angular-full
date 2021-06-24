import {Equipe} from "./equipe";
import {PokemonMatch} from "./pokemon-match";

export class MonPokemon {

  id: number;
  version: number;
  ordre: number;
  equipe: Equipe;
  pokeReference: Pokemon;
  attaque1: Attaque;
  attaque2: Attaque;
  attaque3: Attaque;
  attaque4: Attaque;
  pokeMatch: PokemonMatch;

  constructor(id?: number, version?: number, ordre?: number, equipe?: Equipe, pokeReference?: Pokemon, attaque1?: Attaque, attaque2?: Attaque, attaque3?: Attaque, attaque4?: Attaque, pokeMatch?: PokemonMatch) {
    this.id = id;
    this.version = version;
    this.ordre = ordre;
    this.equipe = equipe;
    this.pokeReference = pokeReference;
    this.attaque1 = attaque1;
    this.attaque2 = attaque2;
    this.attaque3 = attaque3;
    this.attaque4 = attaque4;
    this.pokeMatch = pokeMatch;

  }

}

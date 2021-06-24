import {Combat} from "./combat";
import {PokemonMatch} from "./pokemon-match";

export class Tour{
  id: number;
  version: number;
  actionJoueur1: string;
  actionJoueur2: string;
  attaquePokemon1: string;
  attaquePokemon2: string;

  combat: Combat;
  pokemonMatch1: PokemonMatch;
  pokemonMatch2: PokemonMatch;

  constructor(id?: number, version?: number, actionJoueur1?: string, actionJoueur2?: string, attaquePokemon1?: string, attaquePokemon2?: string) {
    this.id=id;
    this.version=version;
    this.actionJoueur1=actionJoueur1;
    this.actionJoueur2=actionJoueur2;
    this.attaquePokemon1=attaquePokemon1;
    this.attaquePokemon2=attaquePokemon2;
  }
}

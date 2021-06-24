import {MonPokemon} from "./mon-pokemon";
import {Combat} from "./combat";

export class PokemonMatch {

  numero: number;
  version: number;
  hpMatch: number;
  attackMatch: number;
  defenseMatch: number;
  specialAttackMatch: number;
  specialDefenseMatch: number;
  speedMatch: number;
  numAttaqueActive: number;
  statut: string;
  ppAttaque1: number;
  ppAttaque2: number;
  ppAttaque3: number;
  ppAttaque4: number;
  monPokemon: MonPokemon;
  combat: Combat;

  constructor(numero?: number, version?: number, hpMatch?: number, attackMatch?: number, defenseMatch?: number, specialAttackMatch?: number, specialDefenseMatch?: number, speedMatch?: number, numAttaqueActive?: number, statut?: string, ppAttaque1?: number, ppAttaque2?: number, ppAttaque3?: number, ppAttaque4?: number, monPokemon?: MonPokemon, combat?: Combat) {
    this.numero = numero;
    this.version = version;
    this.hpMatch = hpMatch;
    this.attackMatch = attackMatch;
    this.defenseMatch = defenseMatch;
    this.specialAttackMatch = specialAttackMatch;
    this.specialDefenseMatch = specialDefenseMatch;
    this.speedMatch = speedMatch;
    this.numAttaqueActive = numAttaqueActive;
    this.statut = statut;
    this.ppAttaque1 = ppAttaque1;
    this.ppAttaque2 = ppAttaque2;
    this.ppAttaque3 = ppAttaque3;
    this.ppAttaque4 = ppAttaque4;
    this.monPokemon = monPokemon;
    this.combat = combat;
  }

}

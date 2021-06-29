import { Injectable } from '@angular/core';
import {Utilisateur} from "../../model/utilisateur";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Router} from "@angular/router";
import {Equipe} from "../../model/equipe";
import {Observable} from "rxjs";
import {PokemonMatch} from "../../model/pokemon-match";
import {Pokemon} from "../../model/pokemon";
import {MonPokemon} from "../../model/mon-pokemon";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  joueur1: Utilisateur = new Utilisateur();
  equipeEnCoursJoueur1: Equipe = new Equipe();
  pokemonMatchJoeur1: PokemonMatch = new PokemonMatch();

  constructor(private http: HttpClient, private appConfig: AppConfigService, private router: Router) { }

  load(utilisateur: Utilisateur) {
    this.joueur1 = utilisateur;
    this.loadEquipeEnCoursJoueur1().subscribe(resp => {
      this.equipeEnCoursJoueur1 = resp;
      this.initPokemonMatch(this.equipeEnCoursJoueur1.listPokemons[0]);
    }, error => console.log(error));
  }

  loadEquipeEnCoursJoueur1() : Observable<Equipe>{
    return this.http.get<Equipe>(this.appConfig.backEndUrl + "utilisateur/" + this.joueur1.id + "/equipeEnCours")
  }

  getEquipeEnCoursJoueur1(): Equipe {
    return this.equipeEnCoursJoueur1;
  }

  getPokemonMatchJoueur1(): PokemonMatch {
    console.log(this.pokemonMatchJoeur1);
    return this.pokemonMatchJoeur1;
  }

  initPokemonMatch(monPokemon: MonPokemon) {
    this.pokemonMatchJoeur1.hpMatch = monPokemon.pokeReference.hp;
    this.pokemonMatchJoeur1.attackMatch = monPokemon.pokeReference.attaque;
    this.pokemonMatchJoeur1.defenseMatch = monPokemon.pokeReference.defense;
    this.pokemonMatchJoeur1.specialAttackMatch = monPokemon.pokeReference.attaqueSpe;
    this.pokemonMatchJoeur1.specialDefenseMatch = monPokemon.pokeReference.defenseSpe;
    this.pokemonMatchJoeur1.speedMatch = monPokemon.pokeReference.speed;
    this.pokemonMatchJoeur1.ppAttaque1 = monPokemon.attaque1.pointDePouvoir;
    this.pokemonMatchJoeur1.ppAttaque2 = monPokemon.attaque2.pointDePouvoir;
    this.pokemonMatchJoeur1.ppAttaque3 = monPokemon.attaque3.pointDePouvoir;
    this.pokemonMatchJoeur1.ppAttaque4 = monPokemon.attaque4.pointDePouvoir;
    this.pokemonMatchJoeur1.monPokemon = monPokemon;
    console.log(this.pokemonMatchJoeur1);
  }
}

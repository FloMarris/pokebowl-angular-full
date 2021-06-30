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
  joueur2: Utilisateur = new Utilisateur();
  equipeEnCoursJoueur1: Equipe = new Equipe();
  equipeEnCoursJoueur2: Equipe = new Equipe();
  equipeSauvegardeesJoueur2: Array<Equipe> = new Array<Equipe>();
  pokemonMatchJoeur1: PokemonMatch = new PokemonMatch();
  pokemonMatchJoueur2: PokemonMatch = new PokemonMatch();
  pokemonsMatchJ1: Array<PokemonMatch> = new Array<PokemonMatch>();
  pokemonsMatchJ2: Array<PokemonMatch> = new Array<PokemonMatch>();
  idBot: number = 644;

  constructor(private http: HttpClient, private appConfig: AppConfigService, private router: Router) {
    console.log(this.equipeSauvegardeesJoueur2);
  }

  loadJ1(utilisateur: Utilisateur) {
    this.joueur1 = utilisateur;
    this.loadEquipeEnCoursJoueur1().subscribe(resp => {
      this.equipeEnCoursJoueur1 = resp;
      for(let i = 0; i < this.equipeEnCoursJoueur1.listPokemons.length; i++) {
        this.pokemonsMatchJ1.push(this.initPokemonMatch(this.equipeEnCoursJoueur1.listPokemons[i]));
      }
      this.pokemonMatchJoeur1 = this.initPokemonMatch(this.equipeEnCoursJoueur1.listPokemons[0]);
    }, error => console.log(error));
  }

  loadJ2(utilisateur: Utilisateur) {
    this.joueur2 = utilisateur;
    this.loadEquipeEnCoursJoueur1().subscribe(resp => {
      this.equipeEnCoursJoueur2 = resp;
      for(let i = 0; i < this.equipeEnCoursJoueur2.listPokemons.length; i++) {
        this.pokemonsMatchJ2.push(this.initPokemonMatch(this.equipeEnCoursJoueur2.listPokemons[i]));
      }
      this.pokemonMatchJoueur2 = this.initPokemonMatch(this.equipeEnCoursJoueur2.listPokemons[0]);
    }, error => console.log(error));
  }

  loadEquipeEnCoursJoueur1(): Observable<Equipe>{
    return this.http.get<Equipe>(this.appConfig.backEndUrl + "utilisateur/" + this.joueur1.id + "/equipeEnCours")
  }

  loadEquipeEnCoursJoueur2(): Observable<Equipe>{
    return this.http.get<Equipe>(this.appConfig.backEndUrl + "utilisateur/" + this.idBot + "/equipeEnCours")
  }

  getEquipeEnCoursJoueur1(): Equipe {
    return this.equipeEnCoursJoueur1;
  }

  getPokemonMatchJoueur1(): PokemonMatch {
    return this.pokemonMatchJoeur1;
  }

  getEquipesJoueur2(): Array<Equipe> {
    return this.equipeSauvegardeesJoueur2;
  }

  initPokemonMatch(monPokemon: MonPokemon): PokemonMatch{
    let pokemonMatch = new PokemonMatch();

    pokemonMatch.hpMatch = monPokemon.pokeReference.hp;
    pokemonMatch.attackMatch = monPokemon.pokeReference.attaque;
    pokemonMatch.defenseMatch = monPokemon.pokeReference.defense;
    pokemonMatch.specialAttackMatch = monPokemon.pokeReference.attaqueSpe;
    pokemonMatch.specialDefenseMatch = monPokemon.pokeReference.defenseSpe;
    pokemonMatch.speedMatch = monPokemon.pokeReference.speed;
    pokemonMatch.ppAttaque1 = monPokemon.attaque1.pointDePouvoir;
    pokemonMatch.ppAttaque2 = monPokemon.attaque2.pointDePouvoir;
    pokemonMatch.ppAttaque3 = monPokemon.attaque3.pointDePouvoir;
    pokemonMatch.ppAttaque4 = monPokemon.attaque4.pointDePouvoir;
    pokemonMatch.monPokemon = monPokemon;

    return pokemonMatch;
  }

  loadBot(){
    this.loadEquipeEnCoursJoueur2().subscribe(resp => {
      this.equipeEnCoursJoueur2 = resp;
    })
  }
}

import { Injectable } from '@angular/core';
import {Equipe} from "../../model/equipe";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {MonPokemon} from "../../model/mon-pokemon";
import {Pokemon} from "../../model/pokemon";
import {Attaque} from "../../model/attaque";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParametresAvanceesEquipesService {

  equipe: Equipe;
  listMonPokemon: Array<MonPokemon> = new Array<MonPokemon>();
  mapAttaque: Map<string, Array<Attaque>> = new Map<string, Array<Attaque>>();

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.loadEquipe(36);
  }

  find(): Equipe {
    return this.equipe;
  }

  findMonPokemon(): Array<MonPokemon> {
    return this.listMonPokemon;
  }

  findAttaques(nom: string): Array<Attaque> {
    return this.mapAttaque.get(nom);
  }

  loadEquipe(id: number) {
    return this.http.get<Equipe>(this.appConfig.backEndUrl + "equipe/" + id + "/parametres_avances").subscribe(resp => {
      this.equipe = resp;
      this.listMonPokemon = this.equipe.listPokemons;
      for(let i = 0; i < this.listMonPokemon.length; i++) {
        this.loadPokemonWithAttaque(this.listMonPokemon[i].pokeReference.id);
      }
    }, error => console.log(error));
  }

  loadEquipe2(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(this.appConfig.backEndUrl + "equipe/" + id + "/parametres_avances");
  }

  loadPokemonWithAttaque(id: number) {
    this.http.get<Pokemon>(this.appConfig.backEndUrl + "pokemon/" + id + "/attaques").subscribe(resp => {
      this.mapAttaque.set(resp.nom, resp.attaques);
    }, error => console.log(error));
  }

  modify(equipe: Equipe): Observable<Equipe> {
    console.log("hey");
    console.log(equipe);
    console.log(equipe.id);
    return this.http.put<Equipe>(this.appConfig.backEndUrl + "equipe/" + equipe.id, equipe);
  }
}

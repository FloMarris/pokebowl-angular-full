import { Injectable } from '@angular/core';
import {Equipe} from "../../model/equipe";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Pokemon} from "../../model/pokemon";
import {Attaque} from "../../model/attaque";
import {Observable} from "rxjs";
import {MonPokemon} from "../../model/mon-pokemon";

@Injectable({
  providedIn: 'root'
})
export class ParametresAvanceesEquipesService {

  equipe: Equipe = new Equipe();
  mapAttaque: Map<string, Array<Attaque>> = new Map<string, Array<Attaque>>();

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.loadEquipeAndListAttaques(36);
  }

  findEquipe() {
    return this.equipe;
  }

  findAttaques() {
    return this.mapAttaque;
  }

  modify(monPokemon: MonPokemon) {
    this.http.put<MonPokemon>(this.appConfig.backEndUrl + "monPokemon/" + monPokemon.id, monPokemon).subscribe(resp => {
      this.loadEquipeAndListAttaques(36);
    }, error => console.log(error));
  }

  loadEquipeAndListAttaques(id: number) {
    return this.http.get<Equipe>(this.appConfig.backEndUrl + "equipe/" + id + "/parametres_avances").subscribe(resp => {
      this.equipe = resp;
      for(let i = 0; i < this.equipe.listPokemons.length; i++) {
        this.http.get<Pokemon>(this.appConfig.backEndUrl + "pokemon/" + this.equipe.listPokemons[i].pokeReference.id + "/attaques").subscribe(resp => {
          this.mapAttaque.set(resp.nom, resp.attaques);
        }, error => console.log(error));
      }
    }, error => console.log(error));
  }
}

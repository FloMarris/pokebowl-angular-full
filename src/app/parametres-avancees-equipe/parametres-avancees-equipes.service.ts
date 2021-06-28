import { Injectable } from '@angular/core';
import {Equipe} from "../../model/equipe";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Pokemon} from "../../model/pokemon";
import {Attaque} from "../../model/attaque";
import {Observable} from "rxjs";
import {MonPokemon} from "../../model/mon-pokemon";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ParametresAvanceesEquipesService {

  equipe: Equipe = new Equipe();
  mapAttaque: Map<string, Array<Attaque>> = new Map<string, Array<Attaque>>();
  pokemons: Array<Pokemon> = new Array<Pokemon>();
  idEquipe: number;

  constructor(private http: HttpClient, private appConfig: AppConfigService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.idEquipe = params['idEquipe'];
      if(this.idEquipe) {
        this.loadEquipeAndListAttaques(this.idEquipe);
      } //else {
        //this.loadEquipeAndListAttaques(36);
      //}
    });
  }

  findEquipe() {
    return this.equipe;
  }

  findAttaques() {
    return this.mapAttaque;
  }

  modify(monPokemon: MonPokemon): Observable<MonPokemon> {
    return this.http.put<MonPokemon>(this.appConfig.backEndUrl + "monPokemon/" + monPokemon.id, monPokemon);
  }

  loadEquipeAndListAttaques(id: number) {
    return this.http.get<Equipe>(this.appConfig.backEndUrl + "equipe/" + id + "/parametres_avances").subscribe(resp => {
      this.equipe = resp;
      for(let i = 0; i < this.equipe.listPokemons.length; i++) {
        if(this.equipe.listPokemons[i].pokeReference) {
          this.http.get<Pokemon>(this.appConfig.backEndUrl + "pokemon/" + this.equipe.listPokemons[i].pokeReference.id + "/attaques").subscribe(resp => {
            this.mapAttaque.set(resp.nom, resp.attaques);
          }, error => console.log(error));
        }
      }
    }, error => console.log(error));
  }
}

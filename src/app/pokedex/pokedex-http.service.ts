import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Pokemon} from "../../model/pokemon";
import {Observable} from "rxjs";
import {MonPokemon} from "../../model/mon-pokemon";
import {ParametresAvanceesEquipesService} from "../parametres-avancees-equipe/parametres-avancees-equipes.service";

@Injectable({
  providedIn: 'root'
})
export class PokedexHttpService {

  pokemons: Array<Pokemon> = new Array<Pokemon>();
  types: Array<string>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load();
  }

  load() {
    this.http.get<Array<Pokemon>>(this.appConfig.backEndUrl + "pokemon").subscribe(resp => {
      this.pokemons = resp;
    }, error => console.log(error))

    this.appConfig.findAllTypeEnums().subscribe(resp => {
      this.types = resp;
    }, error => console.log(error));
  }

  findAll(): Array<Pokemon> {
    return this.pokemons;
  }

  findMonPokemonById(id:number): Observable<MonPokemon> {
    return this.http.get<MonPokemon>(this.appConfig.backEndUrl + "monPokemon/" + id);
  }

  findPokemonById(idPokemon: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.appConfig.backEndUrl + "pokemon/" + idPokemon);
  }

  modifyMonPokemon(monPokemon: MonPokemon): Observable<MonPokemon> {
    return this.http.put<MonPokemon>(this.appConfig.backEndUrl + "monPokemon/" + monPokemon.id, monPokemon);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Pokemon} from "../../model/pokemon";

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

}

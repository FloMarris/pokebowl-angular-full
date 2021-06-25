import { Injectable } from '@angular/core';
import {Pokemon} from "../../model/pokemon";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {MonPokemon} from "../../model/mon-pokemon";
import {Utilisateur} from "../../model/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class SalonHttpService {

  joueurs: Array<Utilisateur> = new Array<Utilisateur>();
  idSalon: number = 27;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load();
  }

  load() {
    this.http.get<Array<Utilisateur>>(this.appConfig.backEndUrl + "salon/" + this.idSalon + "/joueurs").subscribe(resp => {
      this.joueurs = resp;
    }, error => console.log(error))
  }

}

import { Injectable } from '@angular/core';
import {Utilisateur} from "../../model/utilisateur";
import {Pokemon} from "../../model/pokemon";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Equipe} from "../../model/equipe";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfilHttpService {

  utilisateur: Utilisateur = new Utilisateur();
  id: number = 21;
  equipesSauvegardees: Array<Equipe> = new Array<Equipe>();

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
  }

  loadEquipesSauvegardeesByUtilisateurId(id: number): Observable<Array<Equipe>> {
    return this.http.get<Array<Equipe>>(this.appConfig.backEndUrl +"utilisateur/" + JSON.parse(sessionStorage.getItem("utilisateur")).id + "/equipes")
  }

}

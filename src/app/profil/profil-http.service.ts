import { Injectable } from '@angular/core';
import {Utilisateur} from "../../model/utilisateur";
import {Pokemon} from "../../model/pokemon";
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Equipe} from "../../model/equipe";
import {Observable} from "rxjs";
import {MonPokemon} from "../../model/mon-pokemon";

@Injectable({
  providedIn: 'root'
})
export class ProfilHttpService {

  utilisateur: Utilisateur = new Utilisateur();
  //id: number = 21;
  equipesSauvegardees: Array<Equipe> = new Array<Equipe>();

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.http.get<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/" + this.getIdUtilisateur()).subscribe(resp => {
      this.utilisateur = resp;
    })
  }

  getIdUtilisateur(): number {
    return JSON.parse(sessionStorage.getItem("utilisateur")).id;
  }
  loadEquipesSauvegardeesByUtilisateurId(id: number): Observable<Array<Equipe>> {
    return this.http.get<Array<Equipe>>(this.appConfig.backEndUrl +"utilisateur/" + JSON.parse(sessionStorage.getItem("utilisateur")).id + "/equipes")
  }

  load(id: number): Observable<Array<Equipe>> {
    return this.http.get<Array<Equipe>>(this.appConfig.backEndUrl +"utilisateur/" + id + "/equipes");

  }

  findUtilisateur():Utilisateur {
    return this.utilisateur;
  }

  createMonPokeEquipeSauv(monPokemon:MonPokemon): Observable<MonPokemon> {
    return this.http.post<MonPokemon>(this.appConfig.backEndUrl + "monPokemon", monPokemon);
  }

  createEquipeSauv(equipe:Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.appConfig.backEndUrl + "equipe", equipe);
  }

  modifyEquipeSauv(equipe: Equipe): Observable<Equipe> {
    return this.http.put<Equipe>(this.appConfig.backEndUrl + "equipe/" + equipe.id, equipe);
  }

  deleteMonPokeEquipeSauv(monPokemon:MonPokemon): Observable<MonPokemon> {
    return this.http.delete<MonPokemon>(this.appConfig.backEndUrl + "monPokemon/"+ monPokemon.id);
  }

  getEquipeById(equipe: Equipe): Observable<Equipe> {
    return this.http.get<Equipe>(this.appConfig.backEndUrl + "equipe/" + equipe.id);
  }

  createEquipeEnCours(monPokemon:MonPokemon): Observable<MonPokemon> {
    return this.http.post<MonPokemon>(this.appConfig.backEndUrl + "monPokemon", monPokemon);
  }

  deleteEquipeEnCours(monPokemon:MonPokemon): Observable<MonPokemon> {
    return this.http.delete<MonPokemon>(this.appConfig.backEndUrl + "monPokemon/"+ monPokemon.id);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Pokemon} from "../../model/pokemon";
import {Equipe} from "../../model/equipe";
import {Utilisateur} from "../../model/utilisateur";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {MonPokemon} from "../../model/mon-pokemon";
import {Salon} from "../../model/salon";
// import * as util from "util";

@Injectable({
  providedIn: 'root'
})
export class AccueilHttpService {

  pokemons: Array<Pokemon> = new Array<Pokemon>();
  utilisateur:Utilisateur= new Utilisateur();
  equipePrecedente:Equipe = new Equipe();
  equipesSauvegardees:Array<Equipe> = new Array<Equipe>()
  equipeEnCours :Equipe = new Equipe();

  joueur2:Utilisateur = new Utilisateur();
  equipeSauvegardeesJoueur2: Array<Equipe> = new Array<Equipe>()
  idJoueur2 = 456;
  flagFinChargement = false;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    //this.load(this.getIdUtilisateur());
  }

  getIdUtilisateur(): number {
    return JSON.parse(sessionStorage.getItem("utilisateur")).id;
  }

  load(id:number) {
    this.flagFinChargement = false;
    let utilisateur: Utilisateur = JSON.parse(sessionStorage.getItem("utilisateur"));

    this.http.get<Array<Equipe>>(this.appConfig.backEndUrl + "utilisateur/" + id + "/equipes").subscribe(resp => {
      this.equipesSauvegardees = resp;
    }, error => console.log(error))

    this.http.get<Array<Pokemon>>(this.appConfig.backEndUrl + "pokemon").subscribe(resp => {
      this.pokemons = resp;
    }, error => console.log(error))

    console.log(utilisateur);

    if(utilisateur.derniereEquipe != null) {
      this.http.get<Equipe>(this.appConfig.backEndUrl + "utilisateur/" + id + "/equipePrecedente").subscribe(resp => {
        this.equipePrecedente = resp;
        console.log(this.equipePrecedente);
      }, error => console.log(error))
    }

    this.http.get<Equipe>(this.appConfig.backEndUrl + "utilisateur/" + id + "/equipeEnCours").subscribe(resp => {
      this.equipeEnCours = resp;
    }, error => console.log(error))


    this.http.get<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/" + id).subscribe(resp => {
      this.utilisateur = resp;
    }, error => console.log(error))

    // On charge un joueur 2 pour le salon
    //
    this.http.get<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/" + this.idJoueur2).subscribe(resp => {
      this.joueur2 = resp;
    }, error => console.log(error))


      this.http.get<Array<Equipe>>(this.appConfig.backEndUrl + "utilisateur/" + this.idJoueur2 + "/equipes").subscribe(resp => {
        this.equipeSauvegardeesJoueur2 = resp;
      }, error => console.log(error))

    this.flagFinChargement = true;
  }

  findAllPokemon(): Array<Pokemon> {
    return this.pokemons;
  }

  findEquipeSauvegardees(): Array<Equipe>{
    return this.equipesSauvegardees;
  }

  findEquipeEnCours():Equipe {
    return this.equipeEnCours;
  }

  findEquipePrecedente():Equipe {
    return this.equipePrecedente;
  }

  findUtilisateur():Utilisateur {
    return this.utilisateur;
  }

  findJoueur2():Utilisateur {
    return this.joueur2;
  }

  findEquipesSauvegardeesJoueur2(): Array<Equipe> {
    return this.equipeSauvegardeesJoueur2;
  }

  modifyUtilisateur(utilisateur:Utilisateur){
    this.http.put<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/" + utilisateur.id, utilisateur).subscribe(resp => {
       this.load(this.getIdUtilisateur());
    }, error => console.log(error))
  }

  modifyJoueur2(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/" + utilisateur.id, utilisateur);
  }

  modifyEquipeEnCours(monPokemon:MonPokemon): Observable<MonPokemon> {
    return this.http.put<MonPokemon>(this.appConfig.backEndUrl + "monPokemon/" + monPokemon.id, monPokemon);
  }

  createEquipeEnCours(monPokemon:MonPokemon): Observable<MonPokemon> {
    return this.http.post<MonPokemon>(this.appConfig.backEndUrl + "monPokemon", monPokemon);
  }

  deleteEquipeEnCours(monPokemon:MonPokemon): Observable<MonPokemon> {
    return this.http.delete<MonPokemon>(this.appConfig.backEndUrl + "monPokemon/"+ monPokemon.id);
  }

  createSalon(salon:Salon):Observable<Salon>{
    return this.http.post<Salon>(this.appConfig.backEndUrl + "salon", salon);
  }

}

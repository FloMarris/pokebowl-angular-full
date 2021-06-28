import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Pokemon} from "../../model/pokemon";
import {Equipe} from "../../model/equipe";
import {Utilisateur} from "../../model/utilisateur";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccueilHttpService {

  pokemons: Array<Pokemon> = new Array<Pokemon>();
  utilisateur:Utilisateur= new Utilisateur();
  equipePrecedente:Equipe = new Equipe();
  equipesSauvegardees:Array<Equipe> = new Array<Equipe>()
  equipeEnCours :Equipe = new Equipe();

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load(19);
  }

  load(id:number) {
    this.http.get<Array<Equipe>>(this.appConfig.backEndUrl + "utilisateur/" + id + "/equipes").subscribe(resp => {
      this.equipesSauvegardees = resp;
    }, error => console.log(error))

    this.http.get<Array<Pokemon>>(this.appConfig.backEndUrl + "pokemon").subscribe(resp => {
      this.pokemons = resp;
    }, error => console.log(error))

    this.http.get<Equipe>(this.appConfig.backEndUrl + "utilisateur/" + id + "/equipePrecedente").subscribe(resp => {
      this.equipePrecedente = resp;
    }, error => console.log(error))

    this.http.get<Equipe>(this.appConfig.backEndUrl + "utilisateur/" + id + "/equipeEnCours").subscribe(resp => {
      this.equipeEnCours = resp;
    }, error => console.log(error))


    this.http.get<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/" + id).subscribe(resp => {
      this.utilisateur = resp;
    }, error => console.log(error))

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

  modifyEquipeEnCours(utilisateur:Utilisateur){
    this.http.put<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/" + utilisateur.id, utilisateur).subscribe(resp => {
       this.load(19);
    }, error => console.log(error))
  }
}

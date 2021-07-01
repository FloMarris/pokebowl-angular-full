import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Salon} from "../../model/salon";
import {Equipe} from "../../model/equipe";
import {ActivatedRoute} from "@angular/router";
import {Utilisateur} from "../../model/utilisateur";
import {Observable, ObservableLike} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SalonHttpService {

  salon: Salon = new Salon();
  idSalon: number; //ou 27 pour mes tests
  equipeEnCoursJoueur1:Equipe=new Equipe();
  equipeEnCoursJoueur2 = new Equipe();
  idJoueur2 = 644;
  joueur2: Utilisateur = new Utilisateur();
  joueur1: Utilisateur = new Utilisateur();

  constructor(private http: HttpClient, private appConfig: AppConfigService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.idSalon = params['idSalon'];
      if(this.idSalon) {
        this.load(this.idSalon);
      }
    });
  }

  load(idSalon:number) {
    this.http.get<Salon>(this.appConfig.backEndUrl + "salon/" + idSalon + "/joueurs").subscribe(resp => {
      this.salon = resp;
    }, error => console.log(error))

    this.http.get<Equipe>(this.appConfig.backEndUrl + "utilisateur/" + JSON.parse(sessionStorage.getItem("utilisateur")).id + "/equipeEnCours").subscribe(resp => {
      this.equipeEnCoursJoueur1 = resp;
    }, error => console.log(error))

    this.http.get<Equipe>(this.appConfig.backEndUrl + "utilisateur/" + this.idJoueur2 + "/equipeEnCours").subscribe(resp => {
      this.equipeEnCoursJoueur2 = resp;
    }, error => console.log(error))

    this.http.get<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/" + this.idJoueur2).subscribe(resp => {
      this.joueur2 = resp;
    }, error => console.log(error))

    this.http.get<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/" + JSON.parse(sessionStorage.getItem("utilisateur")).id).subscribe(resp => {
      this.joueur1 = resp;
    }, error => console.log(error))
  }

  findEquipeEnCoursJoueur1():Equipe {
    return this.equipeEnCoursJoueur1;
  }
  findEquipeEnCoursJoueur2():Equipe {
    return this.equipeEnCoursJoueur2;
  }

  findSalon():Salon {
    return this.salon;
  }

  findJoueur2(): Utilisateur {
    console.log(this.joueur2.equipeEnCours);
    return this.joueur2;
  }

  findJoueur1(): Utilisateur {
    return this.joueur1;
  }


  //
  // modifySalon(salon:Salon){
  //   this.http.put<Salon>(this.appConfig.backEndUrl + "salon/" + salon.id, salon).subscribe(resp => {
  //     this.load(salon.id);
  //   }, error => console.log(error))
  // }

}

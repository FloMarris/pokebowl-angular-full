import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Salon} from "../../model/salon";
import {Equipe} from "../../model/equipe";

@Injectable({
  providedIn: 'root'
})
export class SalonHttpService {

  salon: Salon = new Salon();
  idSalon: number = 28; //ou 27 pour mes tests
  equipeEnCours:Equipe=new Equipe();

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load();
  }

  load() {
    this.http.get<Salon>(this.appConfig.backEndUrl + "salon/" + this.idSalon).subscribe(resp => {
      this.salon = resp;
    }, error => console.log(error))

    this.http.get<Equipe>(this.appConfig.backEndUrl + "utilisateur/" + JSON.parse(sessionStorage.getItem("utilisateur")).id + "/equipeEnCours").subscribe(resp => {
      this.equipeEnCours = resp;
    }, error => console.log(error))
  }

  findEquipeEnCours():Equipe {
    return this.equipeEnCours;
  }

}

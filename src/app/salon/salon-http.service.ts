import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConfigService} from "../app-config.service";
import {Salon} from "../../model/salon";

@Injectable({
  providedIn: 'root'
})
export class SalonHttpService {

  salon: Salon = new Salon();
  idSalon: number = 27; //ou 27 pour mes tests

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load();
  }

  load() {
    this.http.get<Salon>(this.appConfig.backEndUrl + "salon/" + this.idSalon + "/joueurs").subscribe(resp => {
      this.salon = resp;
    }, error => console.log(error))
  }

}

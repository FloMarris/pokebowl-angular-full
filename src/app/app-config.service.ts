import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pokemon} from "../model/pokemon";
import {Attaque} from "../model/attaque";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  backEndUrl: string = "http://localhost:8080/";
  attaqueProvisoires: Array<Array<Attaque>> = new Array<Array<Attaque>>();

  constructor(private http: HttpClient) {
    this.loadAttaquesAllPoke();
  }

  findAllActions(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backEndUrl + "rest/actions");
  }
  findAllCategorieAttaques(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backEndUrl + "rest/categorieAttaques");
  }
  findAllStatuts(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backEndUrl + "rest/statuts");
  }
  findAllTypeEnums(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backEndUrl + "rest/typeEnums");
  }

  loadAttaquesAllPoke() {
    for(let i=0; i<151; i++)
    {
      this.attaqueProvisoires.push();
      this.http.get<Pokemon>(this.backEndUrl + "pokemon/" + (i+1) + "/attaques").subscribe(resp => {
        this.attaqueProvisoires[i] = resp.attaques;
      }, error => console.log(error));
    }
  }
}

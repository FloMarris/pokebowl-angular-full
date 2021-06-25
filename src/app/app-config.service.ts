import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  backEndUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient) {

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
}

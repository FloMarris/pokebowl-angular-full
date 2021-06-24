import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  backEndUrl: string = "http://localhost:8080/rest/";

  constructor(private http: HttpClient) {

  }

  findAllActions(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backEndUrl + "actions");
  }
  findAllCategorieAttaques(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backEndUrl + "actions");
  }
  findAllStatuts(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backEndUrl + "actions");
  }
  findAllTypeEnums(): Observable<Array<string>> {
    return this.http.get<Array<string>>(this.backEndUrl + "actions");
  }
}

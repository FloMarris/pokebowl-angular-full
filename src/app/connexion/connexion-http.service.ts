import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../../model/utilisateur";
import {AppConfigService} from "../app-config.service";
import {Connexion} from "../../model/connexion";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ConnexionHttpService{

  utilisateurs: Array<Utilisateur> = new Array<Utilisateur>()

  constructor(private http: HttpClient, private appConfig: AppConfigService) {


  }

  auth(connexionForm: Connexion): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.appConfig.backEndUrl + "utilisateur/auth", connexionForm);
  }

}

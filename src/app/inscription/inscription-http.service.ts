import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../../model/utilisateur";
import {AppConfigService} from "../app-config.service";

@Injectable({
  providedIn: 'root'
})

export class InscriptionHttpService{

  utilisateurRequete: Utilisateur;
  utilisateurs: Array<Utilisateur> = new Array<Utilisateur>()
  utilisateurHttpService: Utilisateur;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
  this.load();
  }

  /*findByEmail(email: string) {
    return this.http.get<Utilisateur>(this.appConfig.backEndUrl + "/utilisateur/by-email/" + email).subscribe(resp => {
      this.utilisateurRequete = resp;
    }, error => console.log(error));
  }*/

  load(){
    this.http.get<Array<Utilisateur>>(this.appConfig.backEndUrl + "utilisateur").subscribe(resp => {
      this.utilisateurs = resp;
    }, error => console.log(error));
  }
}

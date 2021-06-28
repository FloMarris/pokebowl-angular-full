import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../../model/utilisateur";
import {AppConfigService} from "../app-config.service";

@Injectable({
  providedIn: 'root'
})

export class ConnexionHttpService{

  utilisateurs: Array<Utilisateur> = new Array<Utilisateur>()

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.load();

  }

  load(){
    this.http.get<Array<Utilisateur>>(this.appConfig.backEndUrl + "utilisateur").subscribe(resp => {
      this.utilisateurs = resp;
    }, error => console.log(error));
  }

}

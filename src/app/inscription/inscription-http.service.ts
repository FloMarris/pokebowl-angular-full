import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../../model/utilisateur";
import {AppConfigService} from "../app-config.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class InscriptionHttpService{

  utilisateurs: Array<Utilisateur> = new Array<Utilisateur>()

  constructor(private http: HttpClient, private appConfig: AppConfigService, private router: Router) {
  this.load();
  }

  load(){
    this.http.get<Array<Utilisateur>>(this.appConfig.backEndUrl + "utilisateur").subscribe(resp => {
      this.utilisateurs = resp;
    }, error => console.log(error));
  }

  create(utilisateur: Utilisateur){
    console.log(utilisateur);
    this.http.post<Utilisateur>(this.appConfig.backEndUrl + "utilisateur", utilisateur).subscribe(resp => {
      utilisateur = null;
      this.router.navigate(['/connexion']);
    }, error => console.log(error));
  }
}

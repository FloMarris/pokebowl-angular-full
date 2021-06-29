import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Utilisateur} from "../../model/utilisateur";
import {AppConfigService} from "../app-config.service";
import {Router} from "@angular/router";
import {Equipe} from "../../model/equipe";
import {Observable} from "rxjs";

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

  create(utilisateur: Utilisateur): Observable<Utilisateur>{
    return this.http.post<Utilisateur>(this.appConfig.backEndUrl + "utilisateur", utilisateur);
  }

  createEquipeVide(equipe: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(this.appConfig.backEndUrl + "equipe", equipe);
  }

  modifyEquipe(equipe: Equipe) {
    this.http.put<Equipe>(this.appConfig.backEndUrl + "equipe/" + equipe.id, equipe).subscribe(resp => {

    })
  }
}

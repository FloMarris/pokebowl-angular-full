import { Component } from '@angular/core';
import {AccueilHttpService} from "./accueil/accueil-http.service";
import {Router} from "@angular/router";
import {MatchService} from "./match/match.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokebowl-angular';
  urlEssai: string="";
  navBarre: Boolean = false;

  constructor(private accueilService: AccueilHttpService, private router: Router,
              private  matchService: MatchService) {
  }

  loadAccueil() {
    if(JSON.parse(sessionStorage.getItem("utilisateur")).id) {
      this.accueilService.load((JSON.parse(sessionStorage.getItem("utilisateur")).id));
    }
  }

  loadMatch() {
    if(JSON.parse(sessionStorage.getItem("utilisateur")).id) {
      this.matchService.loadJ1(JSON.parse(sessionStorage.getItem("utilisateur")));
    }
  }

  recupererPage(){
    return this.router.url == '/connexion' || this.router.url == '/inscription' || this.router.url == '/match' || this.router.url == '/';
  }
}

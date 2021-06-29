import { Component } from '@angular/core';
import {AccueilHttpService} from "./accueil/accueil-http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokebowl-angular';
  urlEssai: string="";
  navBarre: Boolean = false;

  constructor(private accueilService: AccueilHttpService, private router: Router) {
  }

  loadAcceuil() {
    if(JSON.parse(sessionStorage.getItem("utilisateur")).id) {
      this.accueilService.load((JSON.parse(sessionStorage.getItem("utilisateur")).id));
    }
  }
  recupererPage(){
    return this.router.url == '/connexion' || this.router.url == '/inscription';
  }
}

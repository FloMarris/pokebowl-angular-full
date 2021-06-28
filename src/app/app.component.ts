import { Component } from '@angular/core';
import {AccueilHttpService} from "./accueil/accueil-http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokebowl-angular';

  constructor(private accueilService: AccueilHttpService) {
    // sessionStorage.setItem("utilisateur", JSON.stringify());
  }

}

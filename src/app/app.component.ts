import { Component } from '@angular/core';
import {AccueilHttpService} from "./accueil/accueil-http.service";
import {ActivatedRoute, Route, Router, UrlSegment} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokebowl-angular';
  url: string = "";

  constructor(private accueilService: AccueilHttpService, private router: Router, private  route: ActivatedRoute) {
    this.url = this.router.url;
  }

}

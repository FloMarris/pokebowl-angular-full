import {Component, OnInit} from '@angular/core';
import {Utilisateur} from "../../model/utilisateur";
import {InscriptionComponent} from "../inscription/inscription.component";
import {ConnexionHttpService} from "./connexion-http.service";
import {Router} from "@angular/router";
import {Connexion} from "../../model/connexion";
import {AccueilHttpService} from "../accueil/accueil-http.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  connexionForm: Connexion = new Connexion();
  connexionValidation: Boolean = true;

  constructor(private connexionService: ConnexionHttpService, private router: Router,
              private accueilService: AccueilHttpService) {
  }

  ngOnInit(): void {
  }

  connexion() {
    this.connexionService.auth(this.connexionForm).subscribe(resp => {
      sessionStorage.setItem("utilisateur", JSON.stringify(resp));
      this.accueilService.load(this.accueilService.getIdUtilisateur());
      this.router.navigate(['/accueil']);
    }, error => {
      console.log(error);
      this.connexionValidation = false;
    });
  }

}

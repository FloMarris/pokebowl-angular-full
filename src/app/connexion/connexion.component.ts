import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../model/utilisateur";
import {InscriptionComponent} from "../inscription/inscription.component";
import {ConnexionHttpService} from "./connexion-http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  utilisateurForm: Utilisateur = new Utilisateur();
  connexionValidation: Boolean = true;

  constructor(private connexionService: ConnexionHttpService, private router: Router) { }

  ngOnInit(): void {
  }

  connexion(){
    for (let i=0; i<this.connexionService.utilisateurs.length;i++){
      if (this.utilisateurForm.email == this.connexionService.utilisateurs[i].email && this.utilisateurForm.motDePasse == this.connexionService.utilisateurs[i].motDePasse){
        this.router.navigate(['/accueil']);
      }
    }
    this.connexionValidation = false;

  }

}

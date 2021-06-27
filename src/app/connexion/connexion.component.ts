import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../model/utilisateur";
import {InscriptionComponent} from "../inscription/inscription.component";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  utilisateurForm: Utilisateur = null;

  constructor() { }

  ngOnInit(): void {
  }

  motDePasseOublie(){

  }

/*  inscription(){
    return InscriptionComponent;
  }*/

}

import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../model/utilisateur";
import {InscriptionHttpService} from "./inscription-http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {

  utilisateurForm: Utilisateur = new Utilisateur();
  motDePasseBis: string = "";
  inscriptionValidation: Boolean = true;

  constructor(private inscriptionService: InscriptionHttpService) {
  }

  ngOnInit(): void {
  }

  validerPseudo(): Boolean{
    for (let i=0; i<this.inscriptionService.utilisateurs.length;i++){
      if (this.utilisateurForm.pseudo == this.inscriptionService.utilisateurs[i].pseudo){
        return false;
      }
    }
    return true;
  }

  validerMotDePasse(): Boolean{
    while(this.utilisateurForm.motDePasse == null){
      return true;
    }
    if(this.utilisateurForm.motDePasse != this.motDePasseBis){
      return false;
    }
    return true;
  }

  validerEmail(): Boolean{
   for (let i=0; i<this.inscriptionService.utilisateurs.length;i++){
     if (this.utilisateurForm.email == this.inscriptionService.utilisateurs[i].email){
       return false;
     }
   }
   return true;
  }

  inscription(){
    if (this.validerPseudo() && this.validerMotDePasse() && this.validerEmail() && (this.utilisateurForm.pseudo || this.utilisateurForm.email || this.utilisateurForm.motDePasse)){
      this.inscriptionService.create(this.utilisateurForm);
    }
    else {
      this.inscriptionValidation = false;
    }
  }
}

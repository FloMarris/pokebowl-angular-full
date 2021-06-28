import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../model/utilisateur";
import {Equipe} from "../../model/equipe";
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

  constructor(private inscriptionService: InscriptionHttpService, private router: Router) {
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
      this.inscriptionService.createEquipeVide(new Equipe()).subscribe(resp => {
        this.utilisateurForm.equipeEnCours = new Equipe();
        //this.utilisateurForm.derniereEquipe = new Equipe();
        this.utilisateurForm.equipeEnCours.id = resp.id;
        //this.utilisateurForm.derniereEquipe.id = resp.id;
        this.utilisateurForm.equipeSauvegardees = new Array<Equipe>();
        this.inscriptionService.create(this.utilisateurForm).subscribe(resp1 => {
          for(let i = 0; i < 4; i++) {
            this.inscriptionService.createEquipeVide(new Equipe(null, null, null, null, null, null, resp1)).subscribe(resp2 => {
              this.router.navigate(['/connexion']);
              }, error => console.log(error));
          }
          console.log(resp1);
          }, error => console.log(error));
      }, error => console.log(error));
    }
    else {
      this.inscriptionValidation = false;
    }
  }
}
 /*
for(let i = 0; i < 4; i++) {
  this.inscriptionService.createEquipeVide(new Equipe()).subscribe(resp2 => {
    this.utilisateurForm.equipeSauvegardees.push(new Equipe());
    this.utilisateurForm.equipeSauvegardees[i].id = resp.id;
    utilisateur = null;
    this.router.navigate(['/connexion']);
  }, error => console.log(error));;
  console.log(this.utilisateurForm); */

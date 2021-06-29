import { Component, OnInit } from '@angular/core';
import {SalonHttpService} from "./salon-http.service";
import {MonPokemon} from "../../model/mon-pokemon";
import {Equipe} from "../../model/equipe";
import {Salon} from "../../model/salon";
import {Utilisateur} from "../../model/utilisateur";

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss']
})
export class SalonComponent implements OnInit {
  joueur:Utilisateur=new Utilisateur();
  salonForm:Salon=new Salon();

  constructor(private salonService: SalonHttpService) {
    this.joueur = JSON.parse(sessionStorage.getItem("utilisateur"));
    this.salonForm = this.salonService.salon;
    this.salonForm.joueur1 = this.joueur;
  }

  ngOnInit(): void {

  }

  findNomSalon(): string {
    this.salonForm = this.salonService.salon;
    return this.salonForm.nom;
  }

  findCodeSalon(): string {
    return this.salonForm.motDePasse;
  }

  findNomJ1(): string {
    return  this.salonForm.joueur1.pseudo;
  }

  findNomJ2(): string {
    return  this.salonForm.joueur2.pseudo;
  }

  findAvatarJ1(): string {
    return this.salonForm.joueur1.avatar;
  }

  findAvatarJ2(): string {
    return this.salonForm.joueur2.avatar;
  }

  findEquipeJ1(): Equipe {
    return this.salonService.findEquipeEnCours();
  }

  findEquipeJ2(): Equipe {
    return this.salonForm.joueur2.equipeEnCours;
  }

  IsJoueur2(): boolean {
    if (this.salonService.salon.joueur2 != null){
      return true;
    }
    return false;
    // this.salonService.load();
    // if (this.salonService.salon.joueur2 != null){
    //   this.boutonClick = true;
    //   return true;
    // }
    // return false;
    // this.boutonClick = false;
  }


  fight(): void {
    //A faire : action bouton FIGHT
  }
}

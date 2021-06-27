import { Component, OnInit } from '@angular/core';
import {SalonHttpService} from "./salon-http.service";
import {MonPokemon} from "../../model/mon-pokemon";
import {Equipe} from "../../model/equipe";
import {Salon} from "../../model/salon";

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss']
})
export class SalonComponent implements OnInit {

  constructor(private salonService: SalonHttpService) {
  }

  ngOnInit(): void {
  }

  findNomSalon(): string {
    return this.salonService.salon.nom;
  }

  findCodeSalon(): string {
    return this.salonService.salon.motDePasse;
  }

  findNomJ1(): string {
    return  this.salonService.salon.joueur1.pseudo;
  }

  findNomJ2(): string {
    return  this.salonService.salon.joueur2.pseudo;
  }

  findAvatarJ1(): string {
    return this.salonService.salon.joueur1.avatar;
  }

  findAvatarJ2(): string {
    return this.salonService.salon.joueur2.avatar;
  }

  findEquipeJ1(): Equipe {
    return this.salonService.salon.joueur1.equipeEnCours;
  }

  findEquipeJ2(): Equipe {
    return this.salonService.salon.joueur2.equipeEnCours;
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

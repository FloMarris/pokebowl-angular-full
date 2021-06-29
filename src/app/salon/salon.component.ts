import { Component, OnInit } from '@angular/core';
import {SalonHttpService} from "./salon-http.service";
import {MonPokemon} from "../../model/mon-pokemon";
import {Equipe} from "../../model/equipe";
import {Salon} from "../../model/salon";
import {Utilisateur} from "../../model/utilisateur";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss']
})
export class SalonComponent implements OnInit {
  joueur1:Utilisateur=JSON.parse(sessionStorage.getItem("utilisateur"));
  joueur2:Utilisateur=new Utilisateur();
  salonForm:Salon=new Salon();
  idSalon:number;

  constructor(private salonService: SalonHttpService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.idSalon = params['idSalon'];
    });
  }

  ngOnInit(): void {

  }

  findNomSalon(): string {
    this.salonForm = this.salonService.findSalon();
    return this.salonForm.nom;
  }

  findCodeSalon(): string {
    this.salonForm = this.salonService.findSalon();
    return this.salonForm.motDePasse;
  }

  findNomJ1(): string {
   this.salonForm = this.salonService.findSalon();
    return  this.salonForm.joueur1.pseudo;

  }

  findNomJ2(): string {
    this.salonForm = this.salonService.findSalon();
    return  this.salonForm.joueur2.pseudo;
  }

  findAvatarJ1(): string {
    this.salonForm = this.salonService.findSalon();
    return this.salonForm.joueur1.avatar;
  }

  findAvatarJ2(): string {
    this.salonForm = this.salonService.findSalon();
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

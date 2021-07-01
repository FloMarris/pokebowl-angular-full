import { Component, OnInit } from '@angular/core';
import {SalonHttpService} from "./salon-http.service";
import {Equipe} from "../../model/equipe";
import {Salon} from "../../model/salon";
import {ActivatedRoute} from "@angular/router";
import {MatchService} from "../match/match.service";
import {AccueilHttpService} from "../accueil/accueil-http.service";
import {Utilisateur} from "../../model/utilisateur";

@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.scss']
})
export class SalonComponent implements OnInit {
  salonForm:Salon=new Salon();
  idSalon:number;
  joueur1:Utilisateur = new Utilisateur();

  constructor(private salonService: SalonHttpService, private route: ActivatedRoute,
              private matchService: MatchService) {
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
    return this.salonService.findEquipeEnCoursJoueur1();
  }

  findEquipeJ2(): Equipe {
    return this.salonService.findEquipeEnCoursJoueur2();
  }

  loadMatch(){
    this.joueur1 = this.salonService.findJoueur1();

    this.joueur1.derniereEquipe = new Equipe();
    this.joueur1.derniereEquipe.id = this.salonService.findEquipeEnCoursJoueur1().id;
    this.joueur1.equipeEnCours = new Equipe();
    this.joueur1.equipeEnCours.id = this.salonService.findEquipeEnCoursJoueur1().id;
    this.salonService.modifyUtilisateur(this.joueur1);


    this.matchService.loadJ1(this.salonForm.joueur1);
    this.matchService.loadJ2(this.salonService.findJoueur2());


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

}

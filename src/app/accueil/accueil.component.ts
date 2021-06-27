import { Component, OnInit } from '@angular/core';
import {AccueilHttpService} from "./accueil-http.service";
import {Pokemon} from "../../model/pokemon";
import {MonPokemon} from "../../model/mon-pokemon";
import {Utilisateur} from "../../model/utilisateur";
import {Equipe} from "../../model/equipe";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  nbPokemon:number = 6;
  utilisateurForm:Utilisateur= new Utilisateur();
  utilisateurSession: Utilisateur = JSON.parse(sessionStorage.getItem("utilisateur"));
  equipeEnCoursForm:Equipe = new Equipe();
  equipePrecedenteForm:Equipe = new Equipe();


  constructor(private accueilService: AccueilHttpService) {
  }

  ngOnInit(): void {
  }

  listPokemon(): Array<Pokemon> {
    return this.accueilService.findAllPokemon();
  }

  getEquipeEncours():Equipe{
    this.equipeEnCoursForm =  this.accueilService.findEquipeEnCours();
    return this.accueilService.findEquipeEnCours();
  }

  getEquipePrecedente():Equipe{
    this.equipePrecedenteForm =  this.accueilService.findEquipePrecedente();
    console.log(this.equipePrecedenteForm);
    return this.accueilService.findEquipePrecedente();
  }

   chargerEquipePrecedente(){
    this.equipeEnCoursForm = this.equipePrecedenteForm;
    console.log(this.equipeEnCoursForm);
  //   this.utilisateurForm.equipeEnCours = new Equipe();
  //   this.utilisateurForm.equipeEnCours.id = this.equipePrecedenteForm.id;
  //   this.accueilService.modifyEquipeEnCours(this.utilisateurForm);
   }



}

import { Component, OnInit } from '@angular/core';
import {AccueilHttpService} from "./accueil-http.service";
import {Pokemon} from "../../model/pokemon";
import {MonPokemon} from "../../model/mon-pokemon";
import {Utilisateur} from "../../model/utilisateur";
import {Equipe} from "../../model/equipe";
import {Router} from "@angular/router";

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


  constructor(private accueilService: AccueilHttpService, private router: Router) {
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
    return this.accueilService.findEquipePrecedente();
  }

   chargerEquipePrecedente(){
     this.utilisateurForm = this.accueilService.findUtilisateur();
     this.equipeEnCoursForm = this.equipePrecedenteForm;
     this.utilisateurForm.equipeEnCours = this.equipePrecedenteForm;
     console.log(this.utilisateurForm);
    this.accueilService.modifyUtilisateur(this.utilisateurForm);
   }

  validerEquipeEnCoursForm(){
    for(let i = 0; i < this.equipeEnCoursForm.listPokemons.length; i++) {
      this.equipeEnCoursForm.listPokemons[i].equipe = new Equipe();
      this.equipeEnCoursForm.listPokemons[i].equipe.id = this.equipeEnCoursForm.id;
      this.accueilService.modifyEquipeEnCours(this.equipeEnCoursForm.listPokemons[i]);
    }
    // this.router.navigate(['/parametresEquipe'],{ queryParams: {idEquipe: this.equipeEnCoursForm.id}});
  }



}

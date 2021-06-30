import { Component, OnInit } from '@angular/core';
import {AccueilHttpService} from "./accueil-http.service";
import {Pokemon} from "../../model/pokemon";
import {MonPokemon} from "../../model/mon-pokemon";
import {Utilisateur} from "../../model/utilisateur";
import {Equipe} from "../../model/equipe";
import {Router} from "@angular/router";
import {Salon} from "../../model/salon";
import {SalonComponent} from "../salon/salon.component";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  utilisateurForm: Utilisateur = new Utilisateur();
  utilisateurSession: Utilisateur = new Utilisateur();
  equipeEnCoursForm: Equipe = new Equipe();
  equipePrecedenteForm: Equipe = new Equipe();
  equipeSauvegardesForm: Array<Equipe> = new Array<Equipe>();
  nombrePokemonParEquipe: number;
  salonForm:Salon = new Salon();
  joueur2:Utilisateur = new Utilisateur();

  constructor(private accueilService: AccueilHttpService, private router: Router) {
  }

  ngOnInit(): void {
  }

  listPokemon(): Array<Pokemon> {
    return this.accueilService.findAllPokemon();
  }

  getEquipeEncours(): Equipe {
    this.equipeEnCoursForm = this.accueilService.findEquipeEnCours();
    return this.accueilService.findEquipeEnCours();
  }

  getEquipePrecedente(): Equipe {
    this.equipePrecedenteForm = this.accueilService.findEquipePrecedente();
    return this.accueilService.findEquipePrecedente();
  }

  chargerEquipePrecedente() {
    this.utilisateurForm = this.accueilService.findUtilisateur();
    this.equipeEnCoursForm = this.equipePrecedenteForm;
    this.utilisateurForm.equipeEnCours = this.equipePrecedenteForm;
    this.accueilService.modifyUtilisateur(this.utilisateurForm);
  }

  chargerEquipeSauvegardee(index: number) {
    this.utilisateurForm = this.accueilService.findUtilisateur();
    this.equipeSauvegardesForm = this.accueilService.findEquipeSauvegardees();
    this.equipeEnCoursForm = this.equipeSauvegardesForm[index];
    this.utilisateurForm.equipeEnCours = this.equipeSauvegardesForm[index];
    this.accueilService.modifyUtilisateur(this.utilisateurForm);
  }

  validerEquipeEnCoursForm(){
    let counter = 0;
    for(let i = 0; i < this.equipeEnCoursForm.listPokemons.length; i++) {
        this.equipeEnCoursForm.listPokemons[i].equipe = new Equipe();
        this.equipeEnCoursForm.listPokemons[i].equipe.id = this.equipeEnCoursForm.id;
        this.accueilService.modifyEquipeEnCours(this.equipeEnCoursForm.listPokemons[i]).subscribe(resp => {
          counter++;
          if (counter == this.equipeEnCoursForm.listPokemons.length - 1) {
            this.router.navigate(['/parametresEquipe'], {queryParams: {idEquipe: this.equipeEnCoursForm.id}});
          }
        }, error => console.log(error));
    }
  }

  changePokeReferenceMonPoke(index: number) {
    this.equipeEnCoursForm.listPokemons[index].equipe = new Equipe();
    this.equipeEnCoursForm.listPokemons[index].equipe.id = this.equipeEnCoursForm.id;
    this.accueilService.modifyEquipeEnCours(this.equipeEnCoursForm.listPokemons[index]).subscribe(resp => {
      this.accueilService.load(this.accueilService.getIdUtilisateur());
    }, error => console.log(error));
  }

  changerTailleEquipeEnCours() {
    this.utilisateurForm = this.accueilService.findUtilisateur();

    if (this.equipeEnCoursForm.listPokemons.length != 0) {
      if (this.nombrePokemonParEquipe > this.equipeEnCoursForm.listPokemons.length) {
        for (let i = this.equipeEnCoursForm.listPokemons.length; i < this.nombrePokemonParEquipe; i++) {
          this.equipeEnCoursForm.listPokemons.push(new MonPokemon());
          this.equipeEnCoursForm.listPokemons[i].equipe = new Equipe();
          this.equipeEnCoursForm.listPokemons[i].equipe.id = this.equipeEnCoursForm.id;
          this.accueilService.createEquipeEnCours(this.equipeEnCoursForm.listPokemons[i]).subscribe(resp => {
            this.accueilService.load(this.utilisateurForm.id);
          }, error => console.log(error));
        }
      }
      if (this.nombrePokemonParEquipe < this.equipeEnCoursForm.listPokemons.length) {

        for (let i = this.equipeEnCoursForm.listPokemons.length - 1; i >= this.nombrePokemonParEquipe; i--) {
          this.accueilService.deleteEquipeEnCours(this.equipeEnCoursForm.listPokemons[i]).subscribe(resp => {
            this.accueilService.load(this.utilisateurForm.id);
          }, error => console.log(error));
        }
      }
    } else {
      this.equipeEnCoursForm.listPokemons = new Array<MonPokemon>();
      this.equipeEnCoursForm.nbrPokemons = this.nombrePokemonParEquipe;
      for (let i = 0; i < this.nombrePokemonParEquipe; i++) {
        this.equipeEnCoursForm.listPokemons.push(new MonPokemon());
        this.equipeEnCoursForm.listPokemons[i].equipe = new Equipe();
        this.equipeEnCoursForm.listPokemons[i].equipe.id = this.equipeEnCoursForm.id;
        this.accueilService.createEquipeEnCours(this.equipeEnCoursForm.listPokemons[i]).subscribe(resp => {
          this.accueilService.load(this.utilisateurForm.id);
        }, error => console.log(error));
      }
    }
  }
    creerSalon(){
    let equipesJ2: Array<Equipe> = this.accueilService.findEquipesSauvegardeesJoueur2();
    let equipeEnCours: Equipe = this.accueilService.findEquipeEnCours();
    this.joueur2 = this.accueilService.findJoueur2();
    this.utilisateurForm = JSON.parse(sessionStorage.getItem("utilisateur"));

    for(let i = 0; equipesJ2.length; i++) {
      if(equipesJ2[i].listPokemons.length == equipeEnCours.listPokemons.length) {
        this.joueur2.equipeEnCours = new Equipe();
        this.joueur2.equipeEnCours.id = equipesJ2[i].id;
        this.accueilService.modifyJoueur2(this.joueur2).subscribe(resp => {
          this.salonForm = new Salon();
          this.salonForm.joueur1 = new Utilisateur();
          this.salonForm.joueur1.id = this.utilisateurForm.id;
          this.salonForm.joueur2 = new Utilisateur();
          this.salonForm.joueur2.id = resp.id;
          this.accueilService.createSalon(this.salonForm).subscribe(resp2 => {
            this.router.navigate(['/salon'], {queryParams: {idSalon: resp2.id}});
          }, error => console.log(error));
        }, error => console.log(error));
        break;
      }
    }
  }
}

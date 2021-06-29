import { Component, OnInit } from '@angular/core';
import {ProfilHttpService} from "./profil-http.service";
import {Equipe} from "../../model/equipe";
import {Router} from "@angular/router";
import {MonPokemon} from "../../model/mon-pokemon";
import {Utilisateur} from "../../model/utilisateur";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  pseudo: string = "";
  email: string = "";
  avatar: string = "";
  pokemonPref: string = "";
  nbrVictoires: number = 0;
  nbrDefaites: number = 0;
  nbrTotalParties: number = 0;
  listEquipes: Array<Equipe> = new Array<Equipe>();
  nombrePokemonParEquipe: number;
  utilisateurForm: Utilisateur= new Utilisateur();
  equipeSauvForm: Equipe = new Equipe();
  boutonActive: boolean = false;

  constructor(private profilService: ProfilHttpService, private router: Router) {
    this.load();
  }

  load() {
    this.profilService.load(this.profilService.getIdUtilisateur()).subscribe(resp => {
      this.profilService.equipesSauvegardees = resp;
      this.profilService.utilisateur = resp[0].utilisateurEquipeSauv;
      this.findInfos();
      if (this.listEquipes.length<4) {
        for (let i=this.listEquipes.length; i<4; i++){
          this.listEquipes.push(new Equipe());
          this.profilService.createEquipeSauv(this.listEquipes[i]).subscribe(resp => {
            this.listEquipes[i] = resp;
          }, error => console.log(error))
          this.listEquipes[i].utilisateurEquipeSauv = new Utilisateur();
          this.listEquipes[i].utilisateurEquipeSauv.id = this.profilService.getIdUtilisateur();
          this.listEquipes[i].listPokemons = new Array<MonPokemon>();
          this.profilService.modifyEquipeSauv(this.listEquipes[i]);
          this.profilService.load(this.profilService.getIdUtilisateur());
        }
      }
    }, error => console.log(error));
  }

  ngOnInit(): void {
  }

  findInfos(): void {
    this.pseudo = this.profilService.utilisateur.pseudo;
    this.email = this.profilService.utilisateur.email;
    this.avatar = this.profilService.utilisateur.avatar;

    if(this.profilService.utilisateur.statistique != null) {
      this.pokemonPref = this.profilService.utilisateur.statistique.pokemonPrefere;
      this.nbrTotalParties = this.profilService.utilisateur.statistique.nbrPartiesJouees;
      this.nbrVictoires = this.profilService.utilisateur.statistique.nbrVictoires;
      this.nbrDefaites = this.profilService.utilisateur.statistique.nbrDefaites;
    }

    this.listEquipes = this.profilService.equipesSauvegardees;
  }

  gerer(indexEquipeSauv: number){
    this.router.navigate(['/parametresEquipe'],{ queryParams: {idEquipe: this.listEquipes[indexEquipeSauv].id}});
  }

  // changerTailleEquipeEnCours(indexEquipeSauv: number) {
  //   //Cas 1 : La liste des pokémons de l'équipe est vide (longueur de 0)
  //   if (this.listEquipes[indexEquipeSauv].listPokemons.length == 0) {
  //     //Cas 1.1 où je sélectionne un chiffre (3, 4, 5, 6)
  //     if (this.nombrePokemonParEquipe != 0 || this.nombrePokemonParEquipe != null) {
  //       this.profilService.getEquipeById(this.listEquipes[indexEquipeSauv]).subscribe(resp => {
  //         this.listEquipes[indexEquipeSauv] = resp;
  //         this.listEquipes[indexEquipeSauv].nbrPokemons = this.nombrePokemonParEquipe;
  //         this.listEquipes[indexEquipeSauv].utilisateurEquipeSauv = new Utilisateur();
  //         this.listEquipes[indexEquipeSauv].utilisateurEquipeSauv.id = this.profilService.getIdUtilisateur();
  //         for (let i = 0; i < this.nombrePokemonParEquipe; i++) {
  //           this.listEquipes[indexEquipeSauv].listPokemons.push(new MonPokemon());
  //           this.listEquipes[indexEquipeSauv].listPokemons[i].equipe = new Equipe();
  //           this.listEquipes[indexEquipeSauv].listPokemons[i].equipe.id = this.listEquipes[indexEquipeSauv].id;
  //           this.profilService.createMonPokeEquipeSauv(this.listEquipes[indexEquipeSauv].listPokemons[i]).subscribe(resp => {
  //             this.profilService.load(this.profilService.getIdUtilisateur());
  //           }, error => console.log(error));
  //         }
  //         this.profilService.modifyEquipeSauv(this.listEquipes[indexEquipeSauv]).subscribe(resp => {
  //           this.profilService.load(this.profilService.getIdUtilisateur());
  //         }, error => console.log(error));
  //       })
  //     }
  //     //Cas 1.2 où je sélectionne aucun chiffre : rien à faire
  //   }
  //
  //   //Cas 2 : La liste des pokémons de l'équipe contient 3, 4, 5 ou 6 pokémons
  //   else {
  //     //Cas 2.1 où je sélectionne un chiffre (3, 4, 5 ou 6)
  //     if (this.nombrePokemonParEquipe >= 3) {
  //       //Cas 2.1.1 où le chiffre sélectionné est supérieur à la longueur de la liste des pokés de mon équipe
  //       if (this.nombrePokemonParEquipe > this.listEquipes[indexEquipeSauv].listPokemons.length) {
  //         this.profilService.getEquipeById(this.listEquipes[indexEquipeSauv]).subscribe(resp => {
  //           this.listEquipes[indexEquipeSauv] = resp;
  //           this.listEquipes[indexEquipeSauv].nbrPokemons = this.nombrePokemonParEquipe;
  //           for (let i = this.listEquipes[indexEquipeSauv].listPokemons.length; i < this.nombrePokemonParEquipe; i++) {
  //             this.listEquipes[indexEquipeSauv].listPokemons.push(new MonPokemon());
  //             this.listEquipes[indexEquipeSauv].listPokemons[i].equipe = new Equipe();
  //             this.listEquipes[indexEquipeSauv].listPokemons[i].equipe.id = this.listEquipes[indexEquipeSauv].id;
  //             this.profilService.createMonPokeEquipeSauv(this.listEquipes[indexEquipeSauv].listPokemons[i]).subscribe(resp => {
  //               this.profilService.load(this.profilService.getIdUtilisateur());
  //             }, error => console.log(error));
  //           }
  //           this.profilService.modifyEquipeSauv(this.listEquipes[indexEquipeSauv]).subscribe(resp => {
  //             this.profilService.load(this.profilService.getIdUtilisateur());
  //           }, error => console.log(error));
  //         })
  //       }
  //       //Cas 2.1.2 où le chiffre sélectionné est inférieur à la longueur de la liste des pokés de mon équipe
  //       else if (this.nombrePokemonParEquipe < this.listEquipes[indexEquipeSauv].listPokemons.length) {
  //         this.listEquipes[indexEquipeSauv].nbrPokemons = this.nombrePokemonParEquipe;
  //         for (let i = this.listEquipes[indexEquipeSauv].listPokemons.length - 1; i >= this.nombrePokemonParEquipe; i--) {
  //           //this.listEquipes[indexEquipeSauv].listPokemons.pop();
  //           this.profilService.deleteMonPokeEquipeSauv(this.listEquipes[indexEquipeSauv].listPokemons[i]).subscribe(resp => {
  //             this.profilService.load(this.profilService.getIdUtilisateur());
  //           }, error => console.log(error));
  //         }
  //       }
  //       //Cas 2.1.3 où le chiffre sélectionné est le même que la longueur de la liste de spokés de mon équipe : rien à faire
  //     }
  //     //Cas 2.2 où je sélectionne aucun chiffre
  //     else {
  //       this.listEquipes[indexEquipeSauv].nbrPokemons = 0;
  //       for (let i = 0; i < this.listEquipes[indexEquipeSauv].listPokemons.length; i++) {
  //         this.listEquipes[indexEquipeSauv].listPokemons.pop();
  //         this.profilService.deleteMonPokeEquipeSauv(this.listEquipes[indexEquipeSauv].listPokemons[i]).subscribe(resp => {
  //           this.profilService.load(this.profilService.getIdUtilisateur());
  //         }, error => console.log(error));
  //       }
  //     }
  //   }
  // }

  changerTailleEquipeEnCours(indexEquipeSauv: number) {

  }
}

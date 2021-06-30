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
  nombrePokemonParEquipe: Array<number> = new Array<number>();
  utilisateurForm: Utilisateur= new Utilisateur();
  equipeSauvForm: Equipe = new Equipe();
  boutonActive: boolean = false;

  constructor(private profilService: ProfilHttpService, private router: Router) {
    this.load();
  }

  load() {
    this.profilService.load(this.profilService.getIdUtilisateur()).subscribe(resp => {
      this.profilService.equipesSauvegardees = resp;
      this.profilService.utilisateur = this.profilService.findUtilisateur();
      this.findInfos();
      if (this.listEquipes.length<4) {
        for (let i=this.listEquipes.length; i<4; i++){
          this.listEquipes.push(new Equipe());
          this.listEquipes[i].utilisateurEquipeSauv = new Utilisateur();
          this.listEquipes[i].utilisateurEquipeSauv.id = this.profilService.getIdUtilisateur();
          this.listEquipes[i].listPokemons = new Array<MonPokemon>();
          this.listEquipes[i].nbrPokemons = 0;
          this.profilService.createEquipeSauv(this.listEquipes[i]).subscribe(resp => {
            this.listEquipes[i] = resp;
            this.profilService.load(this.profilService.getIdUtilisateur());
          }, error => console.log(error))
        }
      }
    }, error => console.log(error));
  }

  ngOnInit(): void {
  }

  findInfos(): void {
    console.log(this.nbrVictoires);
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
    console.log(this.nbrVictoires);
  }

  gerer(indexEquipeSauv: number){
    this.router.navigate(['/parametresEquipe'],{ queryParams: {idEquipe: this.listEquipes[indexEquipeSauv].id, Profil: 1}});
  }

  changerTailleEquipeEnCours(index: number) {
    this.utilisateurForm = this.profilService.findUtilisateur();

    if(this.listEquipes[index].listPokemons.length != 0) {

      if (this.nombrePokemonParEquipe[index]==0) {
        this.listEquipes[index].nbrPokemons = this.nombrePokemonParEquipe[index];
        this.listEquipes[index].utilisateurEquipeSauv.id = this.utilisateurForm.id;
        this.profilService.modifyEquipeSauv(this.listEquipes[index]).subscribe(resp => {
          this.listEquipes[index] = resp;
        })
        for (let i = 0; i < this.listEquipes[index].listPokemons.length; i++) {
          this.profilService.deleteMonPoke(this.listEquipes[index].listPokemons[i]).subscribe(resp => {
            this.profilService.load(this.utilisateurForm.id);
          }, error => console.log(error));
        }
      }

      else if(this.nombrePokemonParEquipe[index] > this.listEquipes[index].listPokemons.length) {
        this.listEquipes[index].nbrPokemons = this.nombrePokemonParEquipe[index];
        this.listEquipes[index].utilisateurEquipeSauv.id = this.utilisateurForm.id;
        this.profilService.modifyEquipeSauv(this.listEquipes[index]).subscribe(resp => {
          this.listEquipes[index] = resp;
        })
        for(let i = this.listEquipes[index].listPokemons.length; i < this.nombrePokemonParEquipe[index]; i++) {
          this.listEquipes[index].listPokemons.push(new MonPokemon());
          this.listEquipes[index].listPokemons[i].equipe = new Equipe();
          this.listEquipes[index].listPokemons[i].equipe.id = this.listEquipes[index].id;
          this.profilService.createMonPoke(this.listEquipes[index].listPokemons[i]).subscribe(resp => {
            this.profilService.load(this.utilisateurForm.id);
          }, error => console.log(error));
        }
      }

     else if(this.nombrePokemonParEquipe[index] < this.listEquipes[index].listPokemons.length) {
        this.listEquipes[index].nbrPokemons = this.nombrePokemonParEquipe[index];
        this.listEquipes[index].utilisateurEquipeSauv.id = this.utilisateurForm.id;
        this.profilService.modifyEquipeSauv(this.listEquipes[index]).subscribe(resp => {
          this.listEquipes[index] = resp;
        })
        for(let i = this.listEquipes[index].listPokemons.length - 1; i >= this.nombrePokemonParEquipe[index]; i--) {
          this.profilService.deleteMonPoke(this.listEquipes[index].listPokemons[i]).subscribe(resp => {
            this.profilService.load(this.utilisateurForm.id);
          }, error => console.log(error));
        }
      }
    }

    else{
      this.listEquipes[index].listPokemons = new Array<MonPokemon>();
      this.listEquipes[index].nbrPokemons = this.nombrePokemonParEquipe[index];
      this.listEquipes[index].utilisateurEquipeSauv.id = this.utilisateurForm.id;
      this.profilService.modifyEquipeSauv(this.listEquipes[index]).subscribe(resp => {
        this.listEquipes[index] = resp;
      })
      for(let i = 0; i < this.nombrePokemonParEquipe[index]; i++) {
        this.listEquipes[index].listPokemons.push(new MonPokemon());
        this.listEquipes[index].listPokemons[i].equipe = new Equipe();
        this.listEquipes[index].listPokemons[i].equipe.id = this.listEquipes[index].id;
        this.profilService.createMonPoke(this.listEquipes[index].listPokemons[i]).subscribe(resp => {
          this.profilService.load(this.utilisateurForm.id);
        }, error => console.log(error));
      }
      console.log(this.listEquipes[index]);
    }
  }
}

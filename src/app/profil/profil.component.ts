import { Component, OnInit } from '@angular/core';
import {ProfilHttpService} from "./profil-http.service";
import {Equipe} from "../../model/equipe";

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

  constructor(private profilService: ProfilHttpService) {
      this.profilService.loadEquipesSauvegardeesByUtilisateurId(profilService.id).subscribe(resp => {
        this.profilService.equipesSauvegardees = resp;
        this.profilService.utilisateur = resp[0].utilisateurEquipeSauv;
        this.findInfos();
      }, error => console.log(error));

  }

  ngOnInit(): void {
  }

  findInfos(): void {
    this.pseudo = this.profilService.utilisateur.pseudo;
    this.email = this.profilService.utilisateur.email;
    this.avatar = this.profilService.utilisateur.avatar;
    this.pokemonPref = this.profilService.utilisateur.statistique.pokemonPrefere;
    this.nbrTotalParties = this.profilService.utilisateur.statistique.nbrPartiesJouees;
    this.nbrVictoires = this.profilService.utilisateur.statistique.nbrVictoires;
    this.nbrDefaites = this.profilService.utilisateur.statistique.nbrDefaites;
    this.listEquipes = this.profilService.equipesSauvegardees;
  }

  gerer(IdEquipeSauv: number){

  }

}

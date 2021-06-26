import { Component, OnInit } from '@angular/core';
import {MonPokemon} from "../../model/mon-pokemon";
import {Equipe} from "../../model/equipe";
import {ParametresAvanceesEquipesService} from "./parametres-avancees-equipes.service";
import {Attaque} from "../../model/attaque";
import {Pokemon} from "../../model/pokemon";
import {connectableObservableDescriptor} from "rxjs/internal/observable/ConnectableObservable";
import {Utilisateur} from "../../model/utilisateur";

@Component({
  selector: 'app-parametres-avancees-equipe',
  templateUrl: './parametres-avancees-equipe.component.html',
  styleUrls: ['./parametres-avancees-equipe.component.scss']
})
export class ParametresAvanceesEquipeComponent implements OnInit {

  equipeForm: Equipe = new Equipe(-1, -1, -1, "", false, -1, new Utilisateur(), new Utilisateur(), new Utilisateur(), new Array<MonPokemon>())
  flag: boolean = false;

  constructor(private parametresAvanceesEquipesServive: ParametresAvanceesEquipesService) {
    this.getEquipeForm();
  }

  findAllMonPokemon(): Array<MonPokemon> {
    return this.parametresAvanceesEquipesServive.findMonPokemon();
  }

  findAttaque(nom: string): Array<Attaque> {
    return this.parametresAvanceesEquipesServive.findAttaques(nom);
  }

  getEquipeForm() {
    this.parametresAvanceesEquipesServive.loadEquipe2(36).subscribe(resp => {
      this.equipeForm = resp;

    },error => console.log(error));
  }

  validerEquipe() {
    console.log(this.equipeForm.listPokemons);
    this.parametresAvanceesEquipesServive.modify(this.equipeForm).subscribe(resp =>{
      }, error => console.log(error));
  }

  ngOnInit(): void {
  }

}

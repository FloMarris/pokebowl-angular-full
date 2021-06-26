import { Component, OnInit } from '@angular/core';
import {Equipe} from "../../model/equipe";
import {ParametresAvanceesEquipesService} from "./parametres-avancees-equipes.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-parametres-avancees-equipe',
  templateUrl: './parametres-avancees-equipe.component.html',
  styleUrls: ['./parametres-avancees-equipe.component.scss']
})
export class ParametresAvanceesEquipeComponent implements OnInit {

  equipeForm: Equipe = new Equipe();
  flag: boolean = false;
  id: number = 36;
  idEquipe: number;

  constructor(private parametresAvanceesEquipesServive: ParametresAvanceesEquipesService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.idEquipe = params['idEquipe'];
    });
  }

  getEquipe(): Equipe {
    this.equipeForm = this.parametresAvanceesEquipesServive.findEquipe();
    return this.parametresAvanceesEquipesServive.findEquipe();
  }

  getAttaques(nom: string) {
    return this.parametresAvanceesEquipesServive.findAttaques().get(nom);
  }

  ngOnInit(): void {
  }

  validerEquipe() {
    for(let i = 0; i < this.equipeForm.listPokemons.length; i++) {
      this.equipeForm.listPokemons[i].equipe = new Equipe();
      this.equipeForm.listPokemons[i].equipe.id = this.equipeForm.id;
      this.parametresAvanceesEquipesServive.modify(this.equipeForm.listPokemons[i]);
    }
  }
}

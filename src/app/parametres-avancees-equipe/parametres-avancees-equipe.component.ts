import { Component, OnInit } from '@angular/core';
import {Equipe} from "../../model/equipe";
import {ParametresAvanceesEquipesService} from "./parametres-avancees-equipes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PokedexHttpService} from "../pokedex/pokedex-http.service";
import {Pokemon} from "../../model/pokemon";
import {MonPokemon} from "../../model/mon-pokemon";
import {Attaque} from "../../model/attaque";
import {AccueilHttpService} from "../accueil/accueil-http.service";

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

  constructor(private parametresAvanceesEquipesServive: ParametresAvanceesEquipesService,
              private route: ActivatedRoute, private pokedexService: PokedexHttpService,
              private router: Router, private accueilService: AccueilHttpService) {
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
    let counter = 0;

    for(let i = 0; i < this.equipeForm.listPokemons.length; i++) {
      this.equipeForm.listPokemons[i].equipe = new Equipe();
      this.equipeForm.listPokemons[i].equipe.id = this.equipeForm.id;
      this.parametresAvanceesEquipesServive.modify(this.equipeForm.listPokemons[i]).subscribe(resp => {
        counter++;
        if(counter == this.equipeForm.listPokemons.length - 1) {
          this.accueilService.load(JSON.parse(sessionStorage.getItem("utilisateur")).id);
          this.router.navigate(['/accueil']);
        }
      }, error => console.log(error));;
    }
  }
  modifyAttaqueMonPokemon(index: number) {
    this.equipeForm.listPokemons[index].equipe = new Equipe();
    this.equipeForm.listPokemons[index].equipe.id = this.equipeForm.id;
    this.parametresAvanceesEquipesServive.modify(this.equipeForm.listPokemons[index]).subscribe(resp =>{
      this.parametresAvanceesEquipesServive.loadEquipeAndListAttaques(this.idEquipe);
    }, error => console.log(error));
  }


  aleatoire(index: number) {
    let idPoke: number = this.pokedexService.pokemons[Math.floor(Math.random() * this.pokedexService.pokemons.length)].id;
    this.pokedexService.findPokemonById(idPoke).subscribe(resp => {
      this.equipeForm.listPokemons[index].pokeReference = resp;
      let attaquesPoke: Array<Attaque> = new Array<Attaque>();
      this.pokedexService.findAllAttaquesPokeByPokeId(idPoke).subscribe(resp => {
        attaquesPoke = resp;
        let idA1: number = this.randomAttaqueId(attaquesPoke);
        let idA2: number = this.randomAttaqueId(attaquesPoke);
        while (idA2==idA1) {
          idA2 = this.randomAttaqueId(attaquesPoke);
        }
        let idA3: number = this.randomAttaqueId(attaquesPoke);
        while (idA3==idA1 || idA3==idA2) {
          idA3 = this.randomAttaqueId(attaquesPoke);
        }
        let idA4: number = this.randomAttaqueId(attaquesPoke);
        while (idA4==idA1 || idA4==idA2 || idA4==idA3) {
          idA4 = this.randomAttaqueId(attaquesPoke);
        }
        this.equipeForm.listPokemons[index].attaque1 = new Attaque();
        this.equipeForm.listPokemons[index].attaque2 = new Attaque();
        this.equipeForm.listPokemons[index].attaque3 = new Attaque();
        this.equipeForm.listPokemons[index].attaque4 = new Attaque();
        this.pokedexService.findAttaqueById(idA1).subscribe(resp => {
          this.equipeForm.listPokemons[index].attaque1 = resp;
        });
        this.pokedexService.findAttaqueById(idA2).subscribe(resp => {
          this.equipeForm.listPokemons[index].attaque2 = resp;
        });
        this.pokedexService.findAttaqueById(idA3).subscribe(resp => {
          this.equipeForm.listPokemons[index].attaque3 = resp;
        });
        this.pokedexService.findAttaqueById(idA4).subscribe(resp => {
          this.equipeForm.listPokemons[index].attaque4 = resp;
        });
      }, error => console.log(error))
    }, error => console.log(error));
  }

  randomAttaqueId(listAttaques: Array<Attaque>): number {
    return listAttaques[Math.floor(Math.random() * listAttaques.length)].id;
  }
}

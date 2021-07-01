import { Component, OnInit } from '@angular/core';
import {Equipe} from "../../model/equipe";
import {ParametresAvanceesEquipesService} from "./parametres-avancees-equipes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PokedexHttpService} from "../pokedex/pokedex-http.service";
import {Pokemon} from "../../model/pokemon";
import {MonPokemon} from "../../model/mon-pokemon";
import {Attaque} from "../../model/attaque";
import {AccueilHttpService} from "../accueil/accueil-http.service";
import {ProfilHttpService} from "../profil/profil-http.service";

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
  fromProfil: boolean = false;
  equipeProvisoireForm: Equipe = new Equipe();
  isEquipeProvisoire: Array<boolean> = [false, false, false, false, false, false];
  pokeProvisoires: Array<Pokemon> = [new Pokemon(), new Pokemon(), new Pokemon(), new Pokemon(), new Pokemon(), new Pokemon()];


  constructor(private parametresAvanceesEquipesServive: ParametresAvanceesEquipesService,
              private route: ActivatedRoute, private pokedexService: PokedexHttpService,
              private router: Router, private accueilService: AccueilHttpService,
              private  profilService: ProfilHttpService) {
    this.route.queryParams.subscribe(params => {
      this.idEquipe = params['idEquipe'];
      if (params['Profil']!=null) {
        this.fromProfil = true;
      }
    });
  }

  getEquipe(): Equipe {
    this.equipeForm = this.parametresAvanceesEquipesServive.findEquipe();
    return this.parametresAvanceesEquipesServive.findEquipe();
  }

  getAttaques(nom: string) {
    return this.parametresAvanceesEquipesServive.findAttaques().get(nom);
  }

  getAttaquesProvisoires(idPoke: number) {
    return this.parametresAvanceesEquipesServive.getAllAttaques()[idPoke];
  }

  ngOnInit(): void {
  }

  validerEquipe() {
    let counter = 0;

    for(let i = 0; i < this.equipeForm.listPokemons.length; i++) {
      if (this.isEquipeProvisoire[i]) {
        this.equipeForm.listPokemons[i] = this.equipeProvisoireForm.listPokemons[i];
      }
      this.equipeForm.listPokemons[i].equipe = new Equipe();
      this.equipeForm.listPokemons[i].equipe.id = this.equipeForm.id;
      this.parametresAvanceesEquipesServive.modify(this.equipeForm.listPokemons[i]).subscribe(resp => {
        counter++;
        if(counter == this.equipeForm.listPokemons.length - 1) {
          this.accueilService.load(JSON.parse(sessionStorage.getItem("utilisateur")).id);
          this.profilService.load(JSON.parse(sessionStorage.getItem("utilisateur")).id)
          if (this.fromProfil) {
            this.router.navigate(['/profil']);
          }
          else {
            this.router.navigate(['/accueil']);
          }
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
    this.isEquipeProvisoire[index] = true;
    this.equipeProvisoireForm = this.equipeForm;
    let idPoke: number = this.pokedexService.pokemons[Math.floor(Math.random() * this.pokedexService.pokemons.length)].id;
    this.pokedexService.findPokemonById(idPoke).subscribe(resp => {
      this.equipeProvisoireForm.listPokemons[index].pokeReference = resp;
      let attaquesPoke: Array<Attaque> = new Array<Attaque>();
      this.pokedexService.findAllAttaquesPokeByPokeId(idPoke).subscribe(resp => {
        attaquesPoke = resp;
        if (attaquesPoke.length==0) {
          this.aleatoire(index);
        }

        this.equipeProvisoireForm.listPokemons[index].attaque1 = new Attaque();
        this.equipeProvisoireForm.listPokemons[index].attaque2 = new Attaque();
        this.equipeProvisoireForm.listPokemons[index].attaque3 = new Attaque();
        this.equipeProvisoireForm.listPokemons[index].attaque4 = new Attaque();

        if (attaquesPoke.length <= 4) {
          this.pokedexService.findAttaqueById(attaquesPoke[0].id).subscribe(resp => {
            this.equipeProvisoireForm.listPokemons[index].attaque1 = resp;
          });
          if (attaquesPoke.length == 2) {
            this.pokedexService.findAttaqueById(attaquesPoke[1].id).subscribe(resp => {
              this.equipeProvisoireForm.listPokemons[index].attaque2 = resp;
            });
          }
          if (attaquesPoke.length == 3) {
            this.pokedexService.findAttaqueById(attaquesPoke[2].id).subscribe(resp => {
              this.equipeProvisoireForm.listPokemons[index].attaque3 = resp;
            });
          }
          if (attaquesPoke.length == 4) {
            this.pokedexService.findAttaqueById(attaquesPoke[3].id).subscribe(resp => {
              this.equipeProvisoireForm.listPokemons[index].attaque4 = resp;
            });
          }
        }

        else {
          let idA1: number = this.randomAttaqueId(attaquesPoke);
          let idA2: number = this.randomAttaqueId(attaquesPoke);
          let i: number = 0;
          while (idA2 == idA1 && i<1000) {
            idA2 = this.randomAttaqueId(attaquesPoke);
            i++;
          }
          let idA3: number = this.randomAttaqueId(attaquesPoke);
          i = 0;
          while ((idA3 == idA1 || idA3 == idA2) && i<1000) {
            idA3 = this.randomAttaqueId(attaquesPoke);
            i++;
          }
          i = 0;
          let idA4: number = this.randomAttaqueId(attaquesPoke);
          while ((idA4 == idA1 || idA4 == idA2 || idA4 == idA3) && i<1000) {
            idA4 = this.randomAttaqueId(attaquesPoke);
            i++;
          }
          this.pokedexService.findAttaqueById(idA1).subscribe(resp => {
            this.equipeProvisoireForm.listPokemons[index].attaque1 = resp;
          });
          this.pokedexService.findAttaqueById(idA2).subscribe(resp => {
            this.equipeProvisoireForm.listPokemons[index].attaque2 = resp;
          });
          this.pokedexService.findAttaqueById(idA3).subscribe(resp => {
            this.equipeProvisoireForm.listPokemons[index].attaque3 = resp;
          });
          this.pokedexService.findAttaqueById(idA4).subscribe(resp => {
            this.equipeProvisoireForm.listPokemons[index].attaque4 = resp;
          });
        }
        }, error => console.log(error))
      }, error => console.log(error));
  }

  randomAttaqueId(listAttaques: Array<Attaque>): number {
    return listAttaques[Math.floor(Math.random() * listAttaques.length)].id;
  }
}

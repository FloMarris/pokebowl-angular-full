import { Component, OnInit } from '@angular/core';
import {PokedexHttpService} from "./pokedex-http.service";
import {Pokemon} from "../../model/pokemon";
import {MajPuisMinPipe} from "../maj-puis-min.pipe";
import {ActivatedRoute, Router} from "@angular/router";
import {Equipe} from "../../model/equipe";
import {MonPokemon} from "../../model/mon-pokemon";
import {ParametresAvanceesEquipesService} from "../parametres-avancees-equipe/parametres-avancees-equipes.service";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  valeur: string = "";
  type1: string = "";
  type2: string = "";
  click1: boolean = false;
  click2: boolean = false
  idEquipe: number
  idMonPokemon: number;
  monPokemonForm: MonPokemon = new MonPokemon();

  constructor(private pokedexService: PokedexHttpService, private route: ActivatedRoute,
              private parametreAvancesEquipeService: ParametresAvanceesEquipesService,
              private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.idMonPokemon = params['idMonPokemon'];
      this.idEquipe = params['idEquipe'];
    });

    if(this.idMonPokemon) {
      this.pokedexService.findMonPokemonById(this.idMonPokemon).subscribe(resp =>{
        this.monPokemonForm = resp;
      }, error => console.log(error));
    }
  }

  ngOnInit(): void {
  }

  list(): Array<Pokemon> {
    return this.pokedexService.findAll();
  }

  rechercheString(): Array<Pokemon> {
    let premiereLettre: string = this.valeur.substr(0, 1).toUpperCase();
    let reste: string = this.valeur.slice(1, this.valeur.length).toLowerCase();
    this.valeur = premiereLettre + reste;
    return this.pokedexService.pokemons.filter(pokemon => pokemon.nom.normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(this.valeur) !== -1);
  }

  rechercheType1(): Array<Pokemon> {
    let l1: Array<Pokemon> = this.pokedexService.pokemons.filter(pokemon => pokemon.type1.type.toLowerCase() == this.type1.toLowerCase());
    let l2: Array<Pokemon> = this.pokedexService.pokemons.filter(pokemon => pokemon.type2?.type.toLowerCase() == this.type1.toLowerCase());
    for(let poke of l2){
      l1.push(poke);
    }
    return l1;
  }

  rechercheType2(): Array<Pokemon> {
    let l1: Array<Pokemon> = this.pokedexService.pokemons.filter(pokemon => pokemon.type1.type.toLowerCase() == this.type2.toLowerCase());
    let l2: Array<Pokemon> = this.pokedexService.pokemons.filter(pokemon => pokemon.type2?.type.toLowerCase() == this.type2.toLowerCase());
    for(let poke of l2){
      l1.push(poke);
    }
    return l1;
  }

  rechercheType1EtType2(): Array<Pokemon> {
    let l1: Array<Pokemon> = this.pokedexService.pokemons.filter(pokemon => (pokemon.type1.type.toLowerCase() == this.type1.toLowerCase()) && (pokemon.type2?.type.toLowerCase() == this.type2.toLowerCase()));
    let l2: Array<Pokemon> = this.pokedexService.pokemons.filter(pokemon => (pokemon.type1.type.toLowerCase() == this.type2.toLowerCase()) && (pokemon.type2?.type.toLowerCase() == this.type1.toLowerCase()));
    for(let poke of l2){
      l1.push(poke);
    }
    return l1;
  }

  RechercheStringEtType1(): Array<Pokemon> {
    let l1: Array<Pokemon> = this.rechercheString();
    let l2: Array<Pokemon> = this.rechercheType1();
    let liste: Array<Pokemon> = new Array<Pokemon>();
    for(let poke of l2) {
      if (this.PokeDansListe(poke, l1)){
        liste.push(poke);
      }
    }
    return liste;
  }

  RechercheStringEtType2(): Array<Pokemon> {
    let l1: Array<Pokemon> = this.rechercheString();
    let l2: Array<Pokemon> = this.rechercheType2();
    let liste: Array<Pokemon> = new Array<Pokemon>();
    for(let poke of l2) {
      if (this.PokeDansListe(poke, l1)){
        liste.push(poke);
      }
    }
    return liste;
  }

  RechercheStringEtType1EtType2(): Array<Pokemon> {
    let l1: Array<Pokemon> = this.rechercheString();
    let l2: Array<Pokemon> = this.rechercheType1EtType2();
    let liste: Array<Pokemon> = new Array<Pokemon>();
    for(let poke of l2) {
      if (this.PokeDansListe(poke, l1)){
        liste.push(poke);
      }
    }
    return liste;
  }

  PokeDansListe(poke: any, liste: Array<any>): boolean {
    for(let i of liste){
      if (poke===i){
        return true;
      }
    }
    return false;
  }

  clickBouton1(value: string): void {
    if (this.type1 == value){
      this.type1 = "";
      this.click1 = false;
    }
    else {
      this.type1 = value;
      this.click1 = true;
    }
  }

  clickBouton2(value: string): void {
    if (this.type2 == value){
      this.type2 = "";
      this.click2 = false;
    }
    else {
      this.type2 = value;
      this.click2 = true;
    }
  }

  listTypes(): Array<string> {
    let liste: Array<string> =  this.pokedexService.types;
    let newList : Array<string> = new Array<string>();
    liste.sort();

    for(let s of liste){
      let premiereLettre: string = s.substr(0,1).toUpperCase();
      let reste: string = s.slice(1, s.length).toLowerCase();
      newList.push(premiereLettre+reste);
    }

    return newList;

  }

  validerMonPokemon(idPokemon: number) {
      this.monPokemonForm.equipe = new Equipe();
      this.monPokemonForm.equipe.id = this.idEquipe;
      this.pokedexService.findPokemonById(idPokemon).subscribe(resp => {
        this.monPokemonForm.pokeReference = resp;
        console.log(this.monPokemonForm);
        this.pokedexService.modifyMonPokemon(this.monPokemonForm).subscribe(resp => {
          this.parametreAvancesEquipeService.loadEquipeAndListAttaques(this.idEquipe);
          this.router.navigate(['/parametresEquipe']);
        }, error => console.log(error));;
      }, error => console.log(error));
  }
}

import { Component, OnInit } from '@angular/core';
import {PokedexHttpService} from "./pokedex-http.service";
import {Pokemon} from "../../model/pokemon";
import {MajPuisMinPipe} from "../maj-puis-min.pipe";

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {

  valeur: string = "";
  type1: string = "";
  type2: string = "";
  typePivot: string = "";
  click1: boolean = false;
  click2: boolean = false

  constructor(private pokedexService: PokedexHttpService) {
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

  ChoisirPokemon(pokemon: Pokemon){
    //A faire
    //Il faut différencier le cas où on vient de la page d'accueil du cas où on vient de la page profil
    //On récupère un pokemon du pokedex qu'il faut set dans un MonPokemon :
      //Si on vient de la page d'acceuil, c'est un MonPokemon de l'équipe en cours
      //Si on vient de la page profil, c'est un MonPokemon d'une équipe sauvegardée
    //A faire aussi : bloquer le bouton choisir si on n'a ni cliqué sur paramètres avancées d'équipe dans acceuil ni sur gérer dans profil
      //Aka : Bloquer le bouton si on est venu nous-mêmes sur la page pokedex depuis la barre de navigation
    // => 1 url /pokedex ; 1 url /acceuil/equipe/id/param-avances-equipe/pokedex ; 1 url /profil/equipe/id/pokedex ?
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

}

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
  click1: boolean = false;
  click2: boolean = false;

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
    let l2: Array<Pokemon> = this.pokedexService.pokemons.filter(pokemon => pokemon.type2.type.toLowerCase() == this.type1.toLowerCase());
    for(let poke of l2){
      l1.push(poke);
    }
    return l1;
  }

  rechercheType2(): Array<Pokemon> {
    return this.pokedexService.pokemons.filter(pokemon => (pokemon.type1.type == this.type2) || (pokemon.type2.type = this.type2));
  }

  clickBouton1(): void {
    if (!this.click1) {
      this.click1 = true;
    }
    else {
      this.click1 = false;
    }
  }

  clickBouton2(): void {
    if (!this.click2) {
      this.click2 = true;
    }
    else {
      this.click2 = false;
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

}

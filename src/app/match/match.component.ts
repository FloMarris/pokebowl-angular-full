import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../model/utilisateur";
import {MatchService} from "./match.service";
import {Equipe} from "../../model/equipe";
import {PokemonMatch} from "../../model/pokemon-match";
import {Attaque} from "../../model/attaque";
import { timer } from 'rxjs';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  hpJ1: number = 100;
  hpJ2: number = 100;
  pokemonMatchJ1: PokemonMatch = new PokemonMatch();
  pokemonMatchJ2: PokemonMatch = new PokemonMatch();
  flag1: boolean = false;
  flag2: boolean = false;
  counter: { min: number, sec: number }
  spanVictoire: string = null;
  spanChangerPokemon: string = null;

  constructor(private matchService: MatchService) {
    //this.startTimer();
  }

  ngOnInit(): void {
  }

  findEquipeEnCoursJoueur1() {
    return this.matchService.getEquipeEnCoursJoueur1();
  }

  findPokemonMatchJoueur1() {
    if(this.flag1) {
      this.matchService.setPokemonMatchJoueur1(null);
      return this.matchService.getPokemonMatchJoueur1();
      this.spanChangerPokemon = "Changer de pokemon";
      console.log("HEEEEEYEYEYYEYE");
    }
    return this.matchService.getPokemonMatchJoueur1();
  }

  findPokemonMatchJoueur2() {
    if(this.flag2) {
      this.matchService.setPokemonMatchJoueur2(this.pokemonMatchJ2);
      return this.matchService.getPokemonMatchJoueur2();
    }
    return this.matchService.getPokemonMatchJoueur2();
  }

  changePokemonMatch(index: number) {
    if(this.flag1) {
      this.flag1 = false;
      this.hpJ1 = 100;
      this.spanChangerPokemon = null;
    }
    this.matchService.pokemonMatchJoeur1 = this.matchService.getPokemonMatchJ1()[index];
  }

  deleteAndChangePokemonMatchJoueur2() {
    this.matchService.getPokemonMatchJ2().shift();
    if(this.matchService.getPokemonMatchJ2().length == 0) {
      this.spanVictoire = "Vous avez gagné !!!"
    } else {
      this.pokemonMatchJ2 = this.matchService.getPokemonMatchJ2()[0];
      this.flag2 = true;
      this.hpJ2 = 100;
    }
  }

  attaquer(index: number) {
    let pokemonMatchJ1: PokemonMatch = this.findPokemonMatchJoueur1();
    let pokemonMatchJ2: PokemonMatch = this.findPokemonMatchJoueur2();

    let index2: number = Math.floor(Math.random() * 4)
    let attaqueJoueur1: Attaque = this.chooseAttaque(index);
    let attaqueJoueur2: Attaque = this.chooseAttaque(index2);

    pokemonMatchJ1.hpMatch -= (((0.4+2)*pokemonMatchJ2.attackMatch*attaqueJoueur2.puissance)/(pokemonMatchJ1.defenseMatch*50)) + 2
    pokemonMatchJ2.hpMatch -= (((0.4+2)*pokemonMatchJ1.attackMatch*attaqueJoueur1.puissance)/(pokemonMatchJ2.defenseMatch*50)) + 2

    if(pokemonMatchJ1.hpMatch <= 0) {
      this.flag1 = true;
      this.hpJ1 = 0;
    } else {
      this.hpJ1 = Math.floor((pokemonMatchJ1.hpMatch/pokemonMatchJ1.monPokemon.pokeReference.hp)*100);
    }

    if(pokemonMatchJ2.hpMatch <= 0) {
      this.hpJ2 = 0;
      this.deleteAndChangePokemonMatchJoueur2();
    } else {
      this.hpJ2 = Math.floor((pokemonMatchJ2.hpMatch/pokemonMatchJ2.monPokemon.pokeReference.hp)*100);
    }

    this.matchService.setPokemonMatchJoueur1(pokemonMatchJ1);
    this.matchService.setPokemonMatchJoueur2(pokemonMatchJ2);
  }

  private chooseAttaque(index: number): Attaque {
    if(index == 0) {
      return this.findPokemonMatchJoueur1().monPokemon.attaque1;
    }
    if(index == 1) {
      return this.findPokemonMatchJoueur1().monPokemon.attaque2;
    }
    if(index == 2) {
      return this.findPokemonMatchJoueur1().monPokemon.attaque3;
    }
    if(index == 3) {
      return this.findPokemonMatchJoueur1().monPokemon.attaque4;
    }
    return null;
  }

  startTimer() {
    this.counter = {min: 0, sec: 10} // choose whatever you want
    let intervalId = setInterval(() => {
      if (this.counter.sec - 1 == -1) {
        this.counter.min -= 1;
        this.counter.sec = 59
      } else this.counter.sec -= 1
      if (this.counter.min === 0 && this.counter.sec == 0) clearInterval(intervalId)
    }, 1000)
  }
}

import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../../model/utilisateur";
import {MatchService} from "./match.service";
import {Equipe} from "../../model/equipe";
import {PokemonMatch} from "../../model/pokemon-match";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  equipeJoueur1: Equipe = new Equipe();

  constructor(private matchService: MatchService) { }

  ngOnInit(): void {
  }

  findJoueur1(): Utilisateur {
    return this.matchService.joueur1;
  }

  findEquipeEnCoursJoueur1() {
    return this.matchService.getEquipeEnCoursJoueur1();
  }

  findPokemonMatchJoueur1() {
    return this.matchService.getPokemonMatchJoueur1();
  }

  changePokemonMatch(index: number) {
    this.matchService.pokemonMatchJoeur1 = this.matchService.pokemonsMatchJ1[index];
  }
}

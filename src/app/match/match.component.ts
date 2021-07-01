import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Utilisateur} from "../../model/utilisateur";
import {MatchService} from "./match.service";
import {Equipe} from "../../model/equipe";
import {PokemonMatch} from "../../model/pokemon-match";
import {Attaque} from "../../model/attaque";
import {Statistique} from "../../model/statistique";
import { timer } from 'rxjs';
import {Router} from "@angular/router";

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
  flag3: boolean = false;
  flagFinCombat: boolean = false;

  flagAttaque: boolean = false;
  messageAttaqueJ1: string;
  messageAttaqueJ2: string;

  spanVictoire: string = null;

  joueur1Form: Utilisateur = new Utilisateur();

  constructor(private matchService: MatchService, private router: Router) {
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
    }
    this.matchService.pokemonMatchJoeur1 = this.matchService.getPokemonMatchJ1()[index];
  }

  deleteAndChangePokemonMatchJoueur2() {
    this.matchService.getPokemonMatchJ2().shift();
    if(this.matchService.getPokemonMatchJ2().length == 0) {
      this.flagFinCombat = true;
      this.majStatJoueur1(false);
      this.spanVictoire = "Vous avez gagné !!!"
    } else {
      this.pokemonMatchJ2 = this.matchService.getPokemonMatchJ2()[0];
      this.flag2 = true;
      this.hpJ2 = 100;
    }
  }

  deletePokemonMatchJoueur1() {
    for(let i = 0; i < this.matchService.getEquipeEnCoursJoueur1().listPokemons.length; i++) {
      if(this.matchService.getPokemonMatchJoueur1().monPokemon.pokeReference.nom === this.matchService.getEquipeEnCoursJoueur1().listPokemons[i].pokeReference.nom) {
        this.matchService.getEquipeEnCoursJoueur1().listPokemons.splice(i,1);
        this.matchService.getPokemonMatchJ1().splice(i, 1);
        break;
      }
    }
  }

  majStatJoueur1(flag: boolean) {
    this.joueur1Form = JSON.parse(sessionStorage.getItem("utilisateur"));

    if(this.joueur1Form.statistique == null) {
      this.joueur1Form.statistique = new Statistique();
      this.joueur1Form.statistique.nbrPartiesJouees = 0;
      this.joueur1Form.statistique.nbrDefaites = 0;
      this.joueur1Form.statistique.nbrVictoires = 0;
    }

    this.joueur1Form.statistique.nbrPartiesJouees += 1;
    if(flag == true) {
      this.joueur1Form.statistique.nbrVictoires += 1;
    } else {
      this.joueur1Form.statistique.nbrDefaites += 1;
    }

    //this.matchService.saveUtilisateur(joueur1).subscribe(resp => {
    //  console.log(resp);
    //}, error => console.log(error));

  }

  retourAccueil() {
  //  this.matchService.saveUtilisateur(this.joueur1Form).subscribe(resp => {
  //    console.log(resp);
      this.router.navigate(['/accueil']);
  //  }, error => console.log(error));
  }

  attaquer(index: number) {
    this.flagAttaque = true;

    let pokemonMatchJ1: PokemonMatch = this.findPokemonMatchJoueur1();
    let pokemonMatchJ2: PokemonMatch = this.findPokemonMatchJoueur2();

    let index2: number = Math.floor(Math.random() * 4)
    let attaqueJoueur1: Attaque = this.chooseAttaque(index);
    let attaqueJoueur2: Attaque = this.chooseAttaque(index2);

    let degatJ1: number = Math.floor((((0.4+2)*pokemonMatchJ1.attackMatch*attaqueJoueur1.puissance)/(pokemonMatchJ2.defenseMatch*50)) + 2);
    let degatJ2: number = Math.floor((((0.4+2)*pokemonMatchJ2.attackMatch*attaqueJoueur2.puissance)/(pokemonMatchJ1.defenseMatch*50)) + 2);

    pokemonMatchJ1.hpMatch -= (((0.4+2)*pokemonMatchJ2.attackMatch*attaqueJoueur2.puissance)/(pokemonMatchJ1.defenseMatch*50)) + 2
    pokemonMatchJ2.hpMatch -= (((0.4+2)*pokemonMatchJ1.attackMatch*attaqueJoueur1.puissance)/(pokemonMatchJ2.defenseMatch*50)) + 2

    if(pokemonMatchJ1.hpMatch <= 0) {
      this.hpJ1 = 0;
      this.deletePokemonMatchJoueur1();
      if(this.matchService.getEquipeEnCoursJoueur1().listPokemons.length == 0) {
        this.flagFinCombat = true;
        this.flag3 = true;
        this.majStatJoueur1(false);
      } else {
        this.flag1 = true;
      }
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

    this.messageAttaqueJ1 = pokemonMatchJ1.monPokemon.pokeReference.nom + " attaque " + attaqueJoueur1.nom + " " + degatJ1 + " dégats !";
    this.messageAttaqueJ2 = pokemonMatchJ2.monPokemon.pokeReference.nom + " attaque " + attaqueJoueur2.nom + " " + degatJ2 + " dégats !";

    setTimeout(() => { this.flagAttaque = false }, 1700);
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

}

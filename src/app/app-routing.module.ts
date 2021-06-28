import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./accueil/accueil.component";
import {ConnexionComponent} from "./connexion/connexion.component";
import {InscriptionComponent} from "./inscription/inscription.component";
import {PokedexComponent} from "./pokedex/pokedex.component";
import {MatchComponent} from "./match/match.component";
import {SalonComponent} from "./salon/salon.component";
import {ParametresAvanceesEquipeComponent} from "./parametres-avancees-equipe/parametres-avancees-equipe.component";
import {ProfilComponent} from "./profil/profil.component";

const routes: Routes = [
  {path: "accueil", component: AccueilComponent},
  {path: "connexion", component: ConnexionComponent},
  {path: "inscription", component: InscriptionComponent},
  {path: "parametresEquipe", component: ParametresAvanceesEquipeComponent},
  {path: "pokedex", component: PokedexComponent},
  {path: "salon", component: SalonComponent},
  {path: "match", component: MatchComponent},
  {path: "profil", component: ProfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

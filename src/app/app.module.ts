import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ParametresAvanceesEquipeComponent } from './parametres-avancees-equipe/parametres-avancees-equipe.component';
import { PokedexComponent } from './pokedex/pokedex.component';
import { SalonComponent } from './salon/salon.component';
import { MatchComponent } from './match/match.component';
import { MajPuisMinPipe } from './maj-puis-min.pipe';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    InscriptionComponent,
    AccueilComponent,
    ParametresAvanceesEquipeComponent,
    PokedexComponent,
    SalonComponent,
    MatchComponent,
    MajPuisMinPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

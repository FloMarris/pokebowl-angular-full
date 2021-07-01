export class Statistique{
  pokemonPrefere: string;
  nbrVictoires: number;
  nbrPartiesJouees: number;
  nbrDefaites: number;

  constructor(pokemonPrefere?: string, nbrVictoires?: number, nbrPartiesJouees?: number, nbrDefaites?: number) {
    this.pokemonPrefere = pokemonPrefere;
    this.nbrVictoires = nbrVictoires;
    this.nbrPartiesJouees = nbrPartiesJouees;
    this.nbrDefaites = nbrDefaites;
  }
}

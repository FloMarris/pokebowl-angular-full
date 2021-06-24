export class Statistique{
  id: number;
  pokemonPrefere: string;
  nbrVictoires: number;
  nbrPartiesJouees: number;
  nbrDefaites: number;

  constructor(id?: number, pokemonPrefere?: string, nbrVictoires?: number, nbrPartiesJouees?: number, nbrDefaites?: number) {
    this.id = id;
    this.pokemonPrefere = pokemonPrefere;
    this.nbrVictoires = nbrVictoires;
    this.nbrPartiesJouees = nbrPartiesJouees;
    this.nbrDefaites = nbrDefaites;
  }
}

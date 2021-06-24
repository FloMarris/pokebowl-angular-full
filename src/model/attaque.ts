import {Pokemon} from "./pokemon";
import {TypeClass} from "./type-class";

export class Attaque{
  id:number;
  version:number;
  nom:string;
  categorie:string;
  pointDePouvoir:number;
  puissance:number;
  precisionAttaque:number;
  description:string;
  pokemons:Array<Pokemon> = new Array<Pokemon>();
  typeAttaque:TypeClass;


  constructor(id?:number, version?:number, nom?:string, categorie?:string, pointDePouvoir?:number, puissance?:number,
              precisionAttaque?:number, description?:string, pokemons?:Array<Pokemon>, typeAttaque?:TypeClass) {
    this.id=id;
    this.version=version;
    this.nom=nom;
    this.categorie=categorie;
    this.pointDePouvoir=pointDePouvoir;
    this.puissance=puissance;
    this.precisionAttaque=precisionAttaque;
    this.description=description;
    this.pokemons=pokemons;
    this.typeAttaque=typeAttaque;
  }

}

import {Attaque} from "./attaque";
import {TypeClass} from "./type-class";

export class Pokemon{
  id: number;
  version:number;
  nom:string;
  hp:number;
  attaque:number;
  defense:number;
  attaqueSpe:number;
  defenseSpe:number;
  speed:number;
  taille:number;
  poids:number;
  generation:number;
  description:string;
  attaques:Array<Attaque>;
  type1:TypeClass;
  type2:TypeClass;

  constructor(id?: number, version?:number, nom?:string, hp?:number, attaque?:number, defense?:number, attaqueSpe?:number,
              defenseSpe?:number, speed?:number, taille?:number, poids?:number, generation?:number, description?:string,
              attaques?:Array<Attaque>, type1?:TypeClass, type2?:TypeClass) {
    this.id=id!;
    this.version=version!;
    this.nom=nom!;
    this.hp=hp!;
    this.attaque=attaque!;
    this.defense=defense!;
    this.attaqueSpe=attaqueSpe!;
    this.defenseSpe=defenseSpe!;
    this.speed=speed!;
    this.taille=taille!;
    this.poids=poids!;
    this.generation=generation!;
    this.description=description!;
    this.attaques=attaques!;
    this.type1=type1!;
    this.type2=type2!;




  }
}

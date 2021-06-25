import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'majPuisMin'
})
export class MajPuisMinPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if(!value) {
      return null;
    }
    let premiereLettre: string = value.substr(0,1).toUpperCase();
    let reste: string = value.slice(1, value.length).toLowerCase();
    let nom: string = premiereLettre+reste;

    return nom;
  }

}

//Este archivo reemplaza heroes.ts

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
    { id: 10, name: 'Spiderwoman' },
    { id: 11, name: 'Badman' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Barbastro' },
    { id: 14, name: 'Ac-Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'CauchoMan' },
    { id: 17, name: 'Dynarama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magmanaman' },
    { id: 20, name: 'Tornado' }
    ];
    return {heroes};
  }

// Anula el método genId para garantizar que un héroe siempre tenga una id.
// If the heroes array is empty, the method below returns the initial number (11).
// if the heroes array is not empty, the method below returns the highest hero id + 1.

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 10;
  }
}

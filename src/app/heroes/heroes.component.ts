import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'; //A
import { HEROES } from '../mock-heroes'; //importas la constante de mock-heroes.ts

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  //hero = 'Windstorm';
  //B
  /*hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };  */

  heroes = HEROES;
  selectedHero: Hero; //Seleccionará los héroes del array, pero no habrá un héroe seleccionado al incio

  constructor() { }

  ngOnInit() {
  }

  onSelect(hero: Hero): void { //asigna el héroe seleccionado de la plantilla al Hero seleccionado del componente.
    this.selectedHero = hero;
  }

}


//A: Buscará en el directorio superior. La clase Hero viene de 'Hero.ts'
//B: Creas el objeto Hero. Antes Hero era un string, ahora estás haciendo que hero sea el objeto Hero
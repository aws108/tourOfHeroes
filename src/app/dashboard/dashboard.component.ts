import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { } //A

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void { //B
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}

/*
A: El constructor espera que Angular inyecte HeroService en una propiedad privada heroService.
B: Este getHeroes () devuelve la lista dividida de héroes en las posiciones 1 y 5, devolviendo 
  solo cuatro de los héroes (2º, 3º, 4º y 5º).

*/
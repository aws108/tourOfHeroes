import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'; //A
//import { HEROES } from '../mock-heroes'; //importas la constante de mock-heroes.ts //C
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

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

  //heroes = HEROES;

  //selectedHero: Hero; //Seleccionará los héroes del array, pero no habrá un héroe seleccionado al incio

  //constructor(private heroService: HeroService, private messageService: MessageService) { } //D1, D2

  heroes: Hero[]; //Cogerá el array directamente

  constructor(private heroService: HeroService) { }

  ngOnInit() { //Recuperas los héroes al inicio. Con el //F a secas no sería una buena práctica
    this.getHeroes();
  }

  getHeroes(): void { //F
    this.heroService.getHeroes() //F
        .subscribe(heroes => this.heroes = heroes);//G
  }

  add(name: string): void { //H
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  /*
  onSelect(hero: Hero): void { //asigna el héroe seleccionado de la plantilla al Hero seleccionado del componente.
    this.selectedHero = hero;
    this.messageService.add(`HeroService: Selected hero id=${hero.id}`);
  }
  */
  
}


//A: Buscará en el directorio superior. La clase Hero viene de 'Hero.ts'

//B: Creas el objeto Hero. Antes Hero era un string, ahora estás haciendo que hero sea el objeto Hero

/*C: Ahora que importamos el servicio de hero, podemos eliminar esta importación. Al crear HeroService
  ya no hará falta, ya que ahora recogemos los datos desde el servicio */

/*D1: El parámetro define simultáneamente una propiedad privada 'heroService' y la identifica
  como un sitio de inyección HeroService. Cuando Angular ejecute HeroesComponent, el sistema de
  inyección de dependencias tendrá un parámetro heroService en la instancia singleton de HeroService.*/ 

/*D2: 
*/

//E: Esta función recupera los héroes del servicio

/*E2: Ahora espera a que el Observable emita una serie de héroes, lo que podría suceder ahora o dentro
  de unos minutos. El método subscribe () pasa la matriz emitida a la devolución de llamada, que
  establece la propiedad de héroes del componente. */

/*F: función que recupera los héroes del servicio. Este métrodo hace que HeroesComponent busca
  y recupera héroes sincrónicamente (a al vez) 

F | G: Con esta versión de getHeroes() se espera a que el Observable de
  heroservice.ts getHeroes(): Observable<Hero[]> emita una serie de héroes, lo que podría suceder
  ahora o dentro de unos minutos. El método subscribe () pasa el array emitido al callback, que
  establece la propiedad de héroes del componente.
  Este enfoque asincrónico funcionará cuando HeroService solicite héroes al servidor.

H: Cuando el nombre dado no está en blanco, el controlador crea un objeto similar a un héroe
  a partir del nombre (solo le falta la id) y lo pasa al método addHero() de los servicios.
  
  Cuando addHero() se guarda con éxito, la devolución de llamada subscribe() recibe al
  nuevo héroe y lo empuja a la lista de héroes para su visualización.
  
*/


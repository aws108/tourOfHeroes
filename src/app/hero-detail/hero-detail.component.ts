/*
Mantener todas las funciones en un componente a medida que la aplicación crece no será mantenible. 
Deberá dividir componentes grandes en subcomponentes más pequeños, cada uno enfocado en una tarea o
flujo de trabajo específico.
Se moverán los detalles del héroe a un HeroDetailComponent separado y reutilizable.
HeroesComponent solo presentará la lista de héroes. HeroDetailComponent presentará detalles
de un héroe seleccionado.

Este componente simplemente recibe un objeto héroe a través de su propiedad héroe y lo muestra.

Este componente tendrá una relación padre-hijo. En este caso este template es hijo

El HeroesComponent padre controlará al HeroDetailComponent hijo enviándole un nuevo
héroe para mostrar cuando el usuario seleccione un héroe de la lista.
*/

import { Component, OnInit, Input } from '@angular/core'; //A
import { Hero } from '../hero'; //hero.ts
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id'); //B
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}

/*
A: Importamos el Input para luego usarlo más tarde para vincular
el HeroesComponent con la propiedad de hero a través del @Input. 
La propiedad de hero será una propiedad de entrada

B: Route.snapshot es una imagen estática de la información de ruta poco después de que se creó
el componente. Es una de las maneras de acceder a los parámetros. Se usa cuando no hay que actualizar
la URL dentro del mismo componente al que está accediendo. 

Para .subscribe y para .snapshot
https://medium.com/@tiboprea/accessing-url-parameters-in-angular-snapshot-vs-subscription-efc4e70f9053

paramMap es un diccionario de valores de parámetros de ruta extraídos de la URL. Aquí lo que se hace 
es tomar la "id" y ese valor devuelve el id del héroe a buscar.

Los parámetros de ruta son siempre Strings. El operador de JavaScript (+) convierte la cadena en un
número (parsea), que es lo que un héroe debería ser (id).

*/
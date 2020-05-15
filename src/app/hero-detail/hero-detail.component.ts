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

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}


/*A: Importamos el Input para luego usarlo más tarde para vincular
el HeroesComponent con la propiedad de hero a través del @Input. 
La propiedad de hero será una propiedad de entrada*/
//Se crea un servicio para servir datos a todos los componentes

import { Injectable } from '@angular/core';
import { Hero } from './hero'; //Pilla los datos
//import { HEROES } from './mock-heroes'; //Pilla los datos
import { Observable, of } from 'rxjs'; //Es un observable

import { MessageService } from './message.service'; 

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators'; //F


@Injectable({ //A 
  providedIn: 'root' //C
})


export class HeroService { //B

  /*getHeroes(): Hero[] {
    return HEROES;
  }*/

  private heroesUrl = 'api/heroes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { } //D

  /*
  getHeroes(): Observable<Hero[]> { //E
    // TODO: send the message _after_ fetching the heroes
    //this.messageService.add('HeroService: fetched heroes'); 
    //return of(HEROES); //Esto se hace en base a los observables. Esto emite un valor del array
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: (details) fatched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }*/

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
  }

  

  /*
  getHeroes(): Observable<Hero[]> { //G
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }*/

/* //H
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET heroes from the server */ //K
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */ //L
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`; //Así hace la URL 'api/heroes/id'
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /** PUT: update the hero on the server */ 
  //hace que persista el guardado de los cambios de nombre del héroe
  //M
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  /*httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }; */

  /** POST: add a new hero to the server */ //Ñ
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  

}
/*getHeroes (), getHero () tiene una forma asincrónica. Devuelven un héroe como un Observable,
utilizando la función RxJS de (). */

/*
A: anotación de la clase Injectable. Es una clase de injección de dependencias.
La clase HeroService proporcionará un servicio inyectable y también puede tener sus
propias dependencias inyectadas. El decorador @Injectable () acepta un objeto de metadatos
para el servicio. @Injectable permite a Angulas optimizar la app eliminando el servicoo si resulta que
no se usa tanto. A través de esta clase se pasan los héroes
 
B: HeroService could get hero data from anywhere—a web service, local storage, or a mock data source.
Devolverá la lista de héroes 

A | C: Esto hace que HeroService esté disponible para el sistema de injección de dependencias.
Un provider es algo que puede crear o prestar un servicio. En este caso, se crea una instancia de la 
clase HeroService para proporcionar el servicio. 
Esto viene ya hecho por defecto. Registra un proveedor con el inyector root. Gracias a root, Angular
crea una única instancia compartida de HeroService e inyecta en cualquier clase lo que solicite

D: Angular will inject the singleton MessageService into that property when it creates the HeroService.

singleton o instancia única es un patrón de diseño que permite restringir la creación de objetos
pertenecientes a una clase o el valor de un tipo a un único objeto. (ver wikipedia) 

Este es un escenario típico de "servicio en servicio": se inyecta el MessageService en el HeroService
que a su vez, se inyecta en el HeroesComponent.

E: HeroService.getHeroes () devolverá un Observable porque eventualmente utilizará el método Angular
  HttpClient.get para obtener los héroes y HttpClient.get () devuelve un Observable. Deberá tener
  una forma asíncrona

F: Las cosas pueden ir mal cuando se cogen datos de un servidor remoto. Se importa un catcher error
  para cazar aquellos errores

G: The catchError() operator intercepts an Observable that failed. It passes the error an error handler
  that can do what it wants with the error. 
  
  Para detectar errores, "pipe" (canaliza) el resultado observable desde http.get () a través de un
  operador RxJS catchError ().

  handleError() informa del error y devuelve un resultado inocuo para que la aplicación siga funcionando.

H: En lugar de manejar el error directamente, devuelve una función de controlador de errores a catchError
  que ha configurado tanto con el nombre de la operación que falló como con un valor de retorno seguro.

K: Los métodos HeroService aprovecharán el flujo (tap) de valores observables y enviarán un mensaje,
  a través del método log (), al área de mensajes en la parte inferior de la página.
  Lo harán con el operador RxJS tap (), que observa los valores observables, hace algo con esos
  valores y los pasa. La devolución de llamada tap () no toca los valores en sí.

L: There are three significant differences from getHeroes():

  - getHero() constructs a request URL with the desired hero's id.
  - The server should respond with a single hero rather than an array of heroes.
  - getHero() returns an Observable<Hero> ("an observable of Hero objects") rather than an observable
    of hero arrays .

M: The HttpClient.put() toma 3 parameters: the URL, the data to update (the modified hero), options
  The heroes web API knows which hero to update by looking at the hero's id.

N: The heroes web API expects a special header in HTTP save requests. That header is in the
  httpOptions constant defined in the HeroService.

Ñ: addHero()difiere from updateHero() in two ways:

  - It calls HttpClient.post() instead of put().
  - It expects the server to generate an id for the new hero, which it returns in the
    Observable<Hero> to the caller.

*/
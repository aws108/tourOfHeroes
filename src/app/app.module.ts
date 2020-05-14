import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component'; //Lo hace automáticamente Angular 

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here. A

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent //Lo hace automáticamente Angular 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //Aplicación de routing
    FormsModule //Se incluye aplicación o módulo de formulario
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




/* A: Then add FormsModule to the @NgModule metadata's imports array, which contains a
list of external modules that the app needs. */

//Se ha hecho: importar el modulo de formularios para hacer pasar los datos a través del @NgModule

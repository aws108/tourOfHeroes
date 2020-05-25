import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component'; //Lo hace automáticamente Angular 

import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // <-- NgModel lives here. A
import { HeroSearchComponent }  from './hero-search/hero-search.component';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessageComponent,
    HeroSearchComponent,
    DashboardComponent //Lo hace automáticamente Angular 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //Aplicación de routing
    FormsModule, //Se incluye aplicación o módulo de formulario
    HttpClientModule, //Importación de HTTP client
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false } //B
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




/* 
A: Then add FormsModule to the @NgModule metadata's imports array, which contains a
list of external modules that the app needs. 

//Se ha hecho: importar el modulo de formularios para hacer pasar los datos a través del @NgModule

B: The HttpClientInMemoryWebApiModule module intercepts HTTP requests and returns simulated server
responses. Remove it when a real server is ready to receive requests.

*/
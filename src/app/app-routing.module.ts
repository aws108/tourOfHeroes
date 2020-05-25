import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component'; //A
import { DashboardComponent } from './dashboard/dashboard.component'; //importas ruta dasboard
import { HeroDetailComponent } from './hero-detail/hero-detail.component'; //Importas el details comp.

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //G
  { path: 'dashboard', component: DashboardComponent }, //F
  { path: 'heroes', component: HeroesComponent }, //B
  { path: 'detail/:id', component: HeroDetailComponent }, 
]; 

@NgModule({ //C
  imports: [RouterModule.forRoot(routes)], //D
  exports: [RouterModule] //E
  
})

export class AppRoutingModule { }

/*
A: HeroesComponent le dará al router un lugar donde ir una vez configurada la ruta

B: 'Routes' le cuenta al router qué view debe mostrar cuando el usuario clica en un link o pega una URL
  Dado que AppRoutingModule ya importa HeroesComponent, puede usarlo en el array de rutas.
  Esto le indica al router que haga coincidir esa URL con el path: 'héroes' y muestre el HeroesComponent
  cuando la URL es algo así como localhost: 4200/heroes.

C: @NgModule inicializa el router y empieza a escuchar los cambios de ubicación del navegador

D: Esta línea agrega el RouterModule al array de importaciones AppRoutingModule y lo configura con las
  rutas en un solo paso llamando a RouterModule.forRoot()
  El método forRoot () proporciona los proveedores de servicios y las directivas necesarias para el
  enrutamiento, y realiza la navegación inicial en función de la URL actual del navegador.

E: AppRoutingModule exporta RouterModule para que esté disponible en toda la aplicación.

F: ruta para el DashboardComponent

G: esta línea hace que por defecto la pagina principal sea el dashboard mediante el redirect

 */


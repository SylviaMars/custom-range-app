import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Exercise1Component } from './components/exercise1/exercise1.component';
import { Exercise2Component } from './components/exercise2/exercise2.component';

const routes: Routes = [];

const ROUTES: Routes = [
  // Routes
  { path: 'exercise1', component: Exercise1Component},
  { path: 'exercise2', component: Exercise2Component},
  { path: '', component: Exercise1Component},
  { path: '**', pathMatch: 'full', redirectTo: ''}
];
export const APP_ROUTING = RouterModule.forRoot(ROUTES, {useHash: true});

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

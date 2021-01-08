import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { Exercise1Component } from './components/exercise1/exercise1.component';
import { Exercise2Component } from './components/exercise2/exercise2.component';
import { CustomRangeComponent } from './components/custom-range/custom-range.component';

@NgModule({
  declarations: [
    AppComponent,
    Exercise1Component,
    Exercise2Component,
    CustomRangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

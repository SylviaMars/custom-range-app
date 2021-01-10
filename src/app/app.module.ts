import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { Exercise1Component } from './components/exercise1/exercise1.component';
import { Exercise2Component } from './components/exercise2/exercise2.component';
import { CommonModule } from '@angular/common';

import { CustomRangeComponent } from './components/custom-range/custom-range.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    Exercise1Component,
    Exercise2Component,
    CustomRangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomRangeComponent } from './custom-range.component';
import { createCustomElement } from '@angular/elements';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CustomRangeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    FormsModule
  ],
  entryComponents: [CustomRangeComponent],
  exports: [CustomRangeComponent]
})
export class CustomRangeModule {
}

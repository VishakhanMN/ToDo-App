import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListToDoComponent } from './list-to-do/list-to-do.component';
import { TestObservablesComponent } from './test-observables/test-observables.component';

@NgModule({
  declarations: [
    AppComponent,
    ListToDoComponent,
    TestObservablesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonlComponent } from './components/buttons/buttonl/buttonl.component';
import { ButtonseComponent } from './components/buttons/buttonse/buttonse.component';
import { ButtonsdeComponent } from './components/buttons/buttonsde/buttonsde.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonlComponent,
    ButtonseComponent,
    ButtonsdeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

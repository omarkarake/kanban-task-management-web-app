import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonlComponent } from './components/buttons/buttonl/buttonl.component';
import { ButtonseComponent } from './components/buttons/buttonse/buttonse.component';
import { ButtonsdeComponent } from './components/buttons/buttonsde/buttonsde.component';
import { SubtaskCheckboxComponent } from './components/subtask-checkbox/subtask-checkbox.component';
import { InputComponent } from './components/input/input.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { NavigationPhoneComponent } from './layout/navigation-phone/navigation-phone.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonlComponent,
    ButtonseComponent,
    ButtonsdeComponent,
    SubtaskCheckboxComponent,
    InputComponent,
    DropdownComponent,
    NavigationPhoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PtComponentComponent } from './pt-component/pt-component.component';
import { PsComponentComponent } from './pt-component/ps-component/ps-component.component';
import { UserComponentComponent } from './user-component/user-component.component';
import { LdComponentComponent } from './ld-component/ld-component.component';
import { HeaderComponentComponent } from './header-component/header-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PtComponentComponent,
    PsComponentComponent,
    UserComponentComponent,
    LdComponentComponent,
    HeaderComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

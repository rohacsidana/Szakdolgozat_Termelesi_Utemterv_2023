import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LdComponent } from './ld/ld.component';
import { UserComponent } from './user/user.component';
import { PtComponent } from './pt/pt.component';
import { PsComponent } from './pt/ps/ps.component';
import { AuthComponent } from './auth/auth.component';
import { WoComponent } from './wo/wo.component';
import { LadComponent } from './wo/lad/lad.component';
import { WodComponent } from './wo/wod/wod.component';
import { WoListComponent } from './wo-list/wo-list.component';
import { XWoCoponent } from './xwo/xwo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LdComponent,
    UserComponent,
    PtComponent,
    PsComponent,
    AuthComponent,
    WoComponent,
    LadComponent,
    WodComponent,
    WoListComponent,
    XWoCoponent
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

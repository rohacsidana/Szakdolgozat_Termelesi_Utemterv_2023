import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LdComponent } from './ld/ld.component';
import { UserComponent } from './user/user.component';
import { PtComponent } from './parts/pt/pt.component';
import { PsComponent } from './parts/ps/ps.component';

import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
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
    XWoCoponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

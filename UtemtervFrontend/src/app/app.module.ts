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

import { XWoCoponent } from './xwo/xwo.component';
import { LnComponent } from './ln/ln.component';
import { LndComponent } from './lnd/lnd.component';
import { ChgComponent } from './chg/chg.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableComponent } from './data-table/data-table.component';
import { GysModComponent } from './ln/gys-mod/gys-mod.component';
import { GysComponent } from './ln/gys/gys.component';
import { Rovidit } from './ln/gys/shorten-pipe';
import { GysService } from './ln/gys/gys.service';
import { WoComponent } from './workorder/wo/wo.component';
import { LadComponent } from './workorder/wo/lad/lad.component';
import { WoListComponent } from './workorder/wo-list/wo-list.component';
import { WodComponent } from './workorder/wo/wod/wod.component';
import { WoFormComponent } from './workorder/wo/wo-form/wo-form.component';
import { HttpClientModule } from '@angular/common/http';
import {MatExpansionModule} from "@angular/material/expansion";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { GysListComponent } from './ln/gys-list/gys-list.component';


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
    WoListComponent,
    XWoCoponent,
    LnComponent,
    LndComponent,
    ChgComponent,
    HomeComponent,
    DataTableComponent,
    GysModComponent,
    GysComponent,
    WodComponent,
    Rovidit,
    WoFormComponent,
    GysListComponent
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
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [GysService],
  bootstrap: [AppComponent],
})
export class AppModule {}
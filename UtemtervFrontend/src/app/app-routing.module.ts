import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LnComponent } from './ln/ln.component';
import { PsComponent } from './parts/ps/ps.component';
import { PtComponent } from './parts/pt/pt.component';
import { LndComponent } from './lnd/lnd.component';
import { ChgComponent } from './chg/chg.component';
import { XWoCoponent } from './xwo/xwo.component';
import { LdComponent } from './ld/ld.component';
import { UserComponent } from './user/user.component';
import { WoListComponent } from './workorder/wo-list/wo-list.component';
import { WoComponent } from './workorder/wo/wo.component';
import { WodComponent } from './workorder/wo/wod/wod.component';
import { LadComponent } from './workorder/wo/lad/lad.component';
import { PtResolver } from './pt.resolver';
import { LnResolver } from './ln.resolver';
import { LoginComponent } from './auth/login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'logout', redirectTo: 'login' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'part',
    resolve: [PtResolver],
    children: [
      { path: '', component: PtComponent },
      { path: 'structure', component: PsComponent },
    ],
  },
  //{path: 'part/structure', component: PsComponent},
  { path: 'inventory', component: LdComponent },
  {
    path: 'line',
    resolve: [LnResolver, PtResolver],
    children: [
      { path: '', component: LnComponent },
      { path: 'change', component: ChgComponent },
      { path: 'rate', component: LndComponent },
    ],
  },

  {
    path: 'workorder',
    children: [
      { path: '', component: WoComponent, pathMatch: 'full' },
      { path: 'new', component: WoComponent },
      { path: 'list', component: WoListComponent },

      {
        path: ':lot',
        component: WoComponent,
        children: [
          { path: '', outlet: 'wod', component: WodComponent },
          { path: '', outlet: 'lad', component: LadComponent },
        ],
      },
    ],
  },
  /* { path: 'workorder/new', component: WoComponent}, */
  /* { path: 'workorder/list', component: WoListComponent, pathMatch: 'full' }, */
  /* { path: ':part', component: WoComponent , children:[
    {path: '', component: WodComponent},
    {path: '',component: LadComponent}
  ]}, */

  { path: 'prodsch', component: XWoCoponent },
  { path: 'user', component: UserComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

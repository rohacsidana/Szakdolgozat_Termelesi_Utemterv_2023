import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { LnComponent } from './ln/ln.component';
import { PsComponent } from './parts/ps/ps.component';
import { PtComponent } from './parts/pt/pt.component';
import { LndComponent } from './lnd/lnd.component';
import { ChgComponent } from './chg/chg.component';
import { WoComponent } from './wo/wo.component';
import { XWoCoponent } from './xwo/xwo.component';


const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'/home', component: HomeComponent},
  {path: '/auth', component: AuthComponent},
  {path: '/part', children:[
    {path: '', component:  PtComponent},
    {path: 'structure', component: PsComponent}
  ]}, 
  {path: '/part/structure', component: PsComponent},
  {path: '/inventory', component: PsComponent},
  {path: '/line', children: [
    {path: '', component: LnComponent},
    {path: 'change', component: ChgComponent},
    {path: 'rate', component: LndComponent},
  ]},
  {path: 'workorder', component: WoComponent}, 
  {path: 'prodsch', component: XWoCoponent},
  {path: 'user', component: XWoCoponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

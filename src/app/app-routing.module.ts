import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterUserComponent } from './components/pages/register-user/register-user.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { AddUserComponent } from './components/dialog/add-user/add-user.component';
import { ErrorComponent } from './components/error/error.component';
import { RouteGuardService } from './service/routeGuard/route-guard.service'



const routes: Routes = [
  {path:'', component:RegisterUserComponent},
  {path:'login', component:RegisterUserComponent},
  {path:'dashboard', component: DashboardComponent,canActivate:[RouteGuardService]},
  {path:'createsbwsrequest', component:AddUserComponent},
  {path:'**', component:ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

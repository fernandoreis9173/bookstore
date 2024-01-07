import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '', component:DashboardComponent, children: [{ path: 'dashboard', component: DashboardComponent}]},
  { path: '**', component:LoginComponent}
];

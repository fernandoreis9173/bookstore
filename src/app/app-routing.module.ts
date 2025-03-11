import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './pages/guards/auth-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { BookstoreComponent } from './pages/bookstore/bookstore.component';
import { CurriculoComponent } from './pages/curriculos/curriculo.component';
import { EscolaridadeComponent } from './pages/curriculos/escolaridade/escolaridade.component';
import { InformacoesComponent } from './pages/curriculos/informacoes/informacoes.component';
import { LastJobComponent } from './pages/curriculos/lastJob/lastJob.component';
import { ParceirosComponent } from './pages/parceiros/parceiros.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login', component: LoginComponent
  },
 {
    path: '', component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'bookstore',
    component: BookstoreComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'curriculos',
    component: CurriculoComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'escolaridade/:id',
    component: EscolaridadeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'infoImportante/:id',
    component: InformacoesComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'lastjob/:id',
    component: LastJobComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'partners',
    component: ParceirosComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'agendamento',
    component: AgendamentoComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

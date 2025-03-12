import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BookstoreComponent } from './bookstore/bookstore.component';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurriculoComponent } from './curriculos/curriculo.component';
import { EscolaridadeComponent } from './curriculos/escolaridade/escolaridade.component';
import { InformacoesComponent } from './curriculos/informacoes/informacoes.component';
import { LastJobComponent } from './curriculos/lastJob/lastJob.component';
import { ParceirosComponent } from './parceiros/parceiros.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FinanceiroComponent } from './financeiro/financeiro.component';

@NgModule(
    {
        providers:[],
        declarations:[
          BookstoreComponent,
          UsersComponent,
          DashboardComponent,
          CurriculoComponent,
          EscolaridadeComponent,
          InformacoesComponent,
          LastJobComponent,
          ParceirosComponent,
          AgendamentoComponent,
          FinanceiroComponent,
        ],
        imports:[
            CommonModule,
            NavbarModule,
            SidebarModule,
            ReactiveFormsModule,

            NgxPaginationModule,
            FormsModule,
            NgSelectModule,
            MatIconModule,
            MatDialogModule,
            MatButtonModule,
            MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
        ],
        exports:[
          BookstoreComponent,
          UsersComponent,
          DashboardComponent,
          CurriculoComponent,
          EscolaridadeComponent,
          InformacoesComponent,
          LastJobComponent,
          ParceirosComponent,
          AgendamentoComponent,
          FinanceiroComponent,
        ]
    }
)

export class PagesModule{ }

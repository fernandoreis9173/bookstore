import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { BookstoreComponent } from './bookstore.component';
import { BookstoreRoutingModule } from './bookstore-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@NgModule(
    {
        providers:[],
        declarations:[BookstoreComponent],
        imports:[
            CommonModule,
            BookstoreRoutingModule,
            NavbarModule,
            SidebarModule,
            ReactiveFormsModule,

            NgxPaginationModule,
            FormsModule,
            NgSelectModule,
            MatIconModule,
            MatDialogModule,
            MatButtonModule
        ]
    }
)

export class BookstoreModule{}

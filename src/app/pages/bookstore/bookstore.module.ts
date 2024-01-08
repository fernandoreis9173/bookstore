import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { BookstoreComponent } from './bookstore.component';
import { BookstoreRoutingModule } from './bookstore-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule(
    {
        providers:[],
        declarations:[BookstoreComponent],
        imports:[
            CommonModule,
            BookstoreRoutingModule,
            NavbarModule,
            SidebarModule,
            ReactiveFormsModule
        ]
    }
)

export class BookstoreModule{}

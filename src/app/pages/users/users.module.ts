import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule(
    {
        providers:[],
        declarations:[UsersComponent],
        imports:[
            CommonModule,
            UsersRoutingModule,
            NavbarModule,
            SidebarModule
        ]
    }
)

export class UserModule{}

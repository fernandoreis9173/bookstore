import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NgModule } from "@angular/core";


@NgModule({
  providers: [],
  declarations: [DashboardComponent],
  imports:[
    CommonModule,
    DashboardRoutingModule
  ]
})

export class DashboardModule{}

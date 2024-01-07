import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { SidebarComponent } from "./sidebar.component";


@NgModule(
  {
    declarations: [SidebarComponent],
    imports: [CommonModule, FormsModule],
    exports: [SidebarComponent]
  }
)

export class SidebarModule {}

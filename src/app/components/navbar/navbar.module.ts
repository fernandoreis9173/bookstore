import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./navbar.component";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";


@NgModule(
  {
    declarations: [NavbarComponent],
    imports: [CommonModule, FormsModule],
    exports: [NavbarComponent]
  }
)

export class NavbarModule {}

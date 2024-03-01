import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";


@NgModule(
  {
    declarations: [ConfirmationDialogComponent],
    imports: [CommonModule, FormsModule],
    exports: [ConfirmationDialogComponent]
  }
)

export class SidebarModule {}

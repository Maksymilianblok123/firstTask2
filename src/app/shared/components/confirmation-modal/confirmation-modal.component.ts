import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  standalone: true
})
export class ConfirmationModalComponent {
  constructor(
      public dialogRef: MatDialogRef<ConfirmationModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { text: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

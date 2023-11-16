import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'recipe-confirmation-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './ui-confirmation-modal.component.html',
  styleUrls: ['./ui-confirmation-modal.component.css'],
})
export class UiConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<UiConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { text: string }
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'lib-ui-author-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './ui-author-dialog.component.html',
  styleUrls: ['./ui-author-dialog.component.css'],
})
export class UiAuthorDialogComponent {}

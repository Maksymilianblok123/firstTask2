import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UiAuthorDialogComponent} from "ui-author-dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'recipe-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './feature-navbar.component.html',
  styleUrls: ['./feature-navbar.component.css'],
})
export class NavbarComponent {
  constructor(private _dialog: MatDialog) {
  }
  openAuthorDialog(): void {
    const dialogRef: MatDialogRef<UiAuthorDialogComponent> = this._dialog.open(UiAuthorDialogComponent, {
      width: '300px',
    });
  }
}

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {AuthorDialogComponent} from "../ui-author-dialog/author-dialog/author-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  constructor(private _dialog: MatDialog) {
  }
  openAuthorDialog(): void {
    const dialogRef = this._dialog.open(AuthorDialogComponent, {
      width: '300px',
    });
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ConfirmationModalComponent} from "../shared/components/confirmation-modal/confirmation-modal.component";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DeleteRecipe} from "../state/recipe/recipes.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  styleUrls: ['./recipe-list-item.component.scss']
})
export class RecipeListItemComponent {
  @Input() recipe!: Recipe;
  @Output() onItemRemove = new EventEmitter<string>();

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private readonly store: Store
  ) {}


  removeRecipe(recipe: Recipe) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { text: `Are you sure, that you want to delete '${recipe.name}'` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {

        this.store.dispatch(new DeleteRecipe(recipe._id))
          .subscribe(() => {
            this._snackBar.open(`Removed element ${recipe.name}`, `OK`)
            this.onItemRemove.emit(recipe._id)
          }, () => {
            this._snackBar.open(`Error while saving`, `OK`)
          })
      }
    });
  }


  navigateToEdit(_id: string) {
    this.router.navigate(['recipe/' + _id +'/edit'])
  }
}

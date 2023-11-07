import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ConfirmationModalComponent} from "../shared/components/confirmation-modal/confirmation-modal.component";
import {Router} from "@angular/router";
import {RecipesService} from "../services/recipes/recipes.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

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
    private recipeService: RecipesService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}


  removeRecipe(recipe: Recipe) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      data: { text: `Czy napewno chcesz usunąć przepis '${recipe.name}'` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.recipeService.deleteRecipe(recipe._id)
          .subscribe(() => {
            this._snackBar.open(`Usunięto element ${recipe.name}`, `OK`)
            this.onItemRemove.emit(recipe._id)
          }, () => {
            this._snackBar.open(`Wystąpił błąd podczas usuwania`, `OK`)
          })
      }
    });
  }


  navigateToEdit(_id: string) {
    this.router.navigate(['recipe/' + _id +'/edit'])
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../types-recipe/recipe";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ConfirmationModalComponent} from "../ui-confirmation-modal/confirmation-modal.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {RecipesFacade} from "../data-access-recipes/state/state/recipe/recipes.fascade";

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
    private _router: Router,
    private _dialog: MatDialog,
    private _recipeFacade: RecipesFacade
  ) {}


  removeRecipe(recipe: Recipe, event: MouseEvent) {
    event.stopPropagation();
    const dialogRef = this._dialog.open(ConfirmationModalComponent, {
      data: { text: `Are you sure, that you want to delete '${recipe.name}'` },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._recipeFacade.deleteRecipe(recipe._id)
      }
    });
  }


  navigateToEdit(_id: string, event: MouseEvent) {
    event.stopPropagation();
    this._router.navigate(['recipe/' + _id +'/edit'])
  }
}

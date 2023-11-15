import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Recipe} from "../../../../types-recipe/src/lib/types-recipe/recipe";
import {RecipesFacade} from "../../../../data-access-recipes/src/lib/data-access-recipes/recipes.fascade";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UiConfirmationModalComponent} from "ui-confirmation-modal";

@Component({
  selector: 'lib-ui-recipe-list-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './ui-recipe-list-item.component.html',
  styleUrls: ['./ui-recipe-list-item.component.css'],
})
export class UiRecipeListItemComponent {
  @Input() recipe!: Recipe;
  @Output() onItemRemove = new EventEmitter<string>();

  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _recipeFacade: RecipesFacade
  ) {}


  removeRecipe(recipe: Recipe, event: MouseEvent) {
    event.stopPropagation();
    const dialogRef = this._dialog.open(UiConfirmationModalComponent, {
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

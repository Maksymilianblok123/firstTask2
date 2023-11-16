import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RecipesFacade} from "data-access-recipes";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UiConfirmationModalComponent} from "ui-confirmation-modal";
import {Recipe} from "types-recipe";

@Component({
  selector: 'recipe-list-item',
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

  removeRecipe(recipe: Recipe, event: MouseEvent): void {
    event.stopPropagation();
    const dialogRef = this._dialog.open(UiConfirmationModalComponent, {
      data: { text: `Are you sure, that you want to delete '${recipe.name}'` },
    });

    dialogRef.afterClosed().subscribe((result: boolean): void => {
      if (result) {
        this._recipeFacade.deleteRecipe(recipe._id)
      }
    });
  }


  navigateToEdit(_id: string | undefined, event: MouseEvent): void {
    event.stopPropagation();
    this._router.navigate(['recipe/' + _id +'/edit'])
  }
}

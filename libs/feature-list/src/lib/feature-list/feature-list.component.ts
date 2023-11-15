import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Recipe} from "../../../../types-recipe/src/lib/types-recipe/recipe";
import {RecipesFacade} from "../../../../data-access-recipes/src/lib/data-access-recipes/recipes.fascade";
import {Select} from "@ngxs/store";
import {RecipesState} from "../../../../data-access-recipes/src/lib/data-access-recipes/recipes.state";
import {Observable, Subscription} from "rxjs";
import {UiRecipeListItemComponent} from "ui-recipe-list-item";

@Component({
  selector: 'lib-feature-list',
  standalone: true,
  imports: [CommonModule, MatInputModule, RouterLink, ReactiveFormsModule, UiRecipeListItemComponent],
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css'],
})
export class FeatureListComponent {
  subscriptions = new Subscription()
  searchFormControl = new FormControl('');
  @Select(RecipesState.filteredRecipes) filteredRecipes$!: Observable<Recipe[]>;


  constructor(
    private _recipeFacade: RecipesFacade,
  ) {
  }

  ngOnInit() {
    this._recipeFacade.getRecipes()

    this.subscriptions.add(
      this.searchFormControl.valueChanges.subscribe((searchTerm: string | null) => {
        this._recipeFacade.updateSearchTerm(searchTerm);
      })
    )
  }

  trackById(index: number, item: Recipe){
    return item._id;
  }

  removeItemFromList(recipeId: string) {
    this._recipeFacade.deleteRecipe(recipeId)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }
}

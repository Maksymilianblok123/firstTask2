import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Recipe } from '../../shared/interfaces/recipe/recipe';
import {AddRecipe, DeleteRecipe, GetRecipe, GetRecipes, RecipesState, UpdateRecipe} from './recipes.state'; // Import the state class

@Injectable({
  providedIn: 'root',
})
export class RecipesFacade {
  // Change the type from 'typeof RecipesState' to 'RecipesState'
  @Select(RecipesState) // Select the whole state
  recipesState$!: Observable<RecipesState>;

  // Access the 'recipes' property from the state
  @Select((state: { recipes: Recipe[]; }) => state.recipes)
  recipes$!: Observable<Recipe[]>;

  // Access the 'activeRecipe' property from the state
  @Select((state: { activeRecipe: Recipe; }) => state.activeRecipe)
  activeRecipe$!: Observable<Recipe>;

  constructor(private _store: Store) {}

  getRecipes() {
    this._store.dispatch(new GetRecipes());
  }

  getRecipe(id: string) {
    return this._store.dispatch(new GetRecipe(id));
  }

  addRecipe(recipe: Recipe) {
    return this._store.dispatch(new AddRecipe(recipe));
  }

  updateRecipe(recipe: Recipe) {
    this._store.dispatch(new UpdateRecipe(recipe));
  }

  deleteRecipe(id: string) {
    this._store.dispatch(new DeleteRecipe(id));
  }
}

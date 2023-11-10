import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Recipe } from '../../shared/interfaces/recipe/recipe';
import {
  AddRecipe,
  DeleteRecipe,
  GetRecipe,
  GetRecipes,
  RecipesState,
  UpdateRecipe
} from './recipes.state';
@Injectable({
  providedIn: 'root',
})
export class RecipesFacade {
  @Select(RecipesState)
  recipesState$!: Observable<RecipesState>;

  @Select((state: { recipes: Recipe[]; }) => state.recipes)
  recipes$!: Observable<Recipe[]>;

  @Select((state: { activeRecipe: Recipe; }) => state.activeRecipe)
  activeRecipe$!: Observable<Recipe>;

  constructor(private _store: Store) {}

  getRecipes(): void {
    this._store.dispatch(new GetRecipes());
  }

  getRecipe(id: string): Observable<Recipe> {
    return this._store.dispatch(new GetRecipe(id));
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this._store.dispatch(new AddRecipe(recipe));
  }

  updateRecipe(recipe: Recipe): void {
    this._store.dispatch(new UpdateRecipe(recipe));
  }

  deleteRecipe(id: string): void {
    this._store.dispatch(new DeleteRecipe(id));
  }
}

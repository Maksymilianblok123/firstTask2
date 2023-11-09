import {State, Action, StateContext, Selector} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Recipe } from '../../shared/interfaces/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AddRecipe, DeleteRecipe, GetRecipe, GetRecipes, UpdateRecipe } from './recipes.actions';
import {environment} from "../../../environments/environment";
import {RecipesService} from "../../shared/services/recipe/recipes.service";
import {MatSnackBar} from "@angular/material/snack-bar";

interface SelectorArg {
  getName?: string | (() => string);
  [key: string]: any;
}
export interface RecipesStateModel extends SelectorArg {
  recipes: Recipe[];

}

@State<RecipesStateModel>({
  name: 'recipes',
  defaults: {
    recipes: [],
  },
})
@Injectable()
export class RecipesState {
  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private _snackBar: MatSnackBar
  ) {}

  @Action(GetRecipes)
  getRecipes(ctx: StateContext<RecipesStateModel>) {
    return this.http
      .get<Recipe[]>(environment.api)
      .pipe(
        tap((recipes) => {
          ctx.patchState({ recipes });
        })
      );
  }

  @Action(GetRecipe)
  getRecipe(ctx: StateContext<RecipesStateModel>, { payload }: GetRecipe) {
    return this.recipesService.getRecipe(payload).pipe(
      tap((recipe) => {
      })
    );
  }

  @Action(DeleteRecipe)
  deleteRecipe(ctx: StateContext<RecipesStateModel>, { payload }: DeleteRecipe) {
    return this.recipesService.deleteRecipe(payload).pipe(
      tap(() => {
        this._snackBar.open(`Removed element`, `OK`)
      })
    );
  }

  @Action(UpdateRecipe)
  updateRecipe(ctx: StateContext<RecipesStateModel>, { payload }: UpdateRecipe) {
    return this.recipesService.updateRecipe(payload).pipe(
      tap(() => {
        this._snackBar.open('Edited item', 'OK');
      })
    );
  }

  @Action(AddRecipe)
  addRecipe(ctx: StateContext<RecipesStateModel>, { payload }: AddRecipe) {
    return this.recipesService.addRecipe(payload).pipe(
      tap(() => {
        this._snackBar.open('Added new recipe', 'OK')
      })
    );
  }

  @Selector()
  static filterRecipes(state: RecipesStateModel, searchTerm: string) {
    return state.recipes.filter(recipe => recipe.name.includes(searchTerm));
  }
}

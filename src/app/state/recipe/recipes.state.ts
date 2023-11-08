import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Recipe } from '../../shared/interfaces/recipe/recipe';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AddRecipe, DeleteRecipe, GetRecipe, GetRecipes, UpdateRecipe } from './recipes.actions';

interface SelectorArg {
  getName?: string | (() => string);
  [key: string]: any;
}
export interface RecipesStateModel extends SelectorArg {
  recipes: Recipe[];

}

@State<RecipesStateModel>({
  name: 'recipes', // State name
  defaults: {
    recipes: [],
  },
})
@Injectable()
export class RecipesState {
  constructor(private http: HttpClient) {}

  private apiEndpoint = 'https://crudcrud.com/api/4e792512535140a082bf592eed0d4bc0/recipe';

  @Action(GetRecipes)
  getRecipes(ctx: StateContext<RecipesStateModel>) {
    return this.http
      .get<Recipe[]>(this.apiEndpoint)
      .pipe(
        tap((recipes) => {
          console.log('tutaj');
          ctx.patchState({ recipes });
        })
      );
  }

  @Action(GetRecipe)
  getRecipe(ctx: StateContext<RecipesStateModel>, { payload }: GetRecipe) {
    return this.http
      .get<Recipe>(`${this.apiEndpoint}/${payload}`)
      .pipe(
        tap((recipe) => {
          // Handle the retrieved recipe as needed
        })
      );
  }

  @Action(DeleteRecipe)
  deleteRecipe(ctx: StateContext<RecipesStateModel>, { payload }: DeleteRecipe) {
    return this.http
      .delete(`${this.apiEndpoint}/${payload}`)
      .pipe(
        tap(() => {
          // Handle the deletion as needed
        })
      );
  }

  @Action(UpdateRecipe)
  updateRecipe(ctx: StateContext<RecipesStateModel>, { payload }: UpdateRecipe) {
    return this.http
      .put(`${this.apiEndpoint}/${payload._id}`, payload)
      .pipe(
        tap(() => {
          // Handle the update as needed
        })
      );
  }

  @Action(AddRecipe)
  addRecipe(ctx: StateContext<RecipesStateModel>, { payload }: AddRecipe) {
    return this.http
      .post(this.apiEndpoint, payload)
      .pipe(
        tap(() => {
          // Handle the addition as needed
        })
      );
  }
}

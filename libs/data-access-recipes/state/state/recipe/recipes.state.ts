import {State, Action, StateContext, Selector} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Recipe } from '../../../../types-recipe/recipe';
import { tap } from 'rxjs/operators';
import {
  AddRecipe,
  AddRecipeSuccess,
  DeleteRecipe,
  FilterRecipes,
  GetRecipe,
  GetRecipes, GetRecipeSuccess,
  UpdateRecipe
} from './recipes.actions';
import {RecipesApiService} from "../../../recipes.service";
import {MatSnackBar} from "@angular/material/snack-bar";

interface SelectorArg {
  getName?: string | (() => string);
  [key: string]: any;
}
export interface RecipesStateModel extends SelectorArg {
  recipes: Recipe[];
  activeRecipe: Recipe | null,
  searchTerm: string | null
}

export {UpdateRecipe, GetRecipes, GetRecipe, DeleteRecipe, AddRecipe}
@State<RecipesStateModel>({
  name: 'recipes',
  defaults: {
    recipes: [],
    activeRecipe: null,
    searchTerm: null
  },
})
@Injectable()
export class RecipesState {
  constructor(
    private _recipesApiService: RecipesApiService,
    private _snackBar: MatSnackBar
  ) {}

  @Action(GetRecipes)
  getRecipes(ctx: StateContext<RecipesStateModel>) {
    return this._recipesApiService.getRecipes().pipe(
        tap((recipes) => {
          ctx.patchState({ recipes });
        })
      );
  }

  @Action(GetRecipe)
  getRecipe(ctx: StateContext<RecipesStateModel>, { payload }: GetRecipe) {
    return this._recipesApiService.getRecipe(payload).pipe(
      tap((recipe: Recipe) => {
        const state: RecipesStateModel = ctx.getState();
        ctx.setState({
          ...state,
          activeRecipe: recipe
        });
        ctx.dispatch(new GetRecipeSuccess())
      })
    );
  }

  @Action(DeleteRecipe)
  deleteRecipe(ctx: StateContext<RecipesStateModel>, { payload }: DeleteRecipe) {
    return this._recipesApiService.deleteRecipe(payload).pipe(
      tap((): void => {
        ctx.setState((state: RecipesStateModel) => {
          const updatedState = {
            ...state,
            recipes: state.recipes.filter((recipe: Recipe): boolean => {
              if(recipe._id === state.activeRecipe?._id && recipe._id === payload) {
                ctx.setState({
                  ...state,
                  activeRecipe: null
                });
              }
              return recipe._id !== payload
            }),
          };
          this._snackBar.open(`Removed recipe with id ${payload}`, 'OK');
          return updatedState;
        });
      })
    );
  }

  @Action(UpdateRecipe)
  updateRecipe(ctx: StateContext<RecipesStateModel>, { payload }: UpdateRecipe) {
    return this._recipesApiService.updateRecipe(payload).pipe(
      tap(() => {
        ctx.setState((state: RecipesStateModel) => {
          const updatedState = {
            ...state,
            recipes: state.recipes.map((recipe) =>
              recipe._id === payload._id ? payload : recipe
            ),
          };
          this._snackBar.open(`Edited recipe ${payload.name}`, 'OK');
          return updatedState;
        });
      })
    );
  }

  @Action(AddRecipe)
  addRecipe(ctx: StateContext<RecipesStateModel>, { payload }: AddRecipe) {
    return this._recipesApiService.addRecipe(payload).pipe(
      tap((newRecipe) => {
        ctx.setState((state: RecipesStateModel) => {
          const updatedState = {
            ...state,
            recipes: [...state.recipes, newRecipe],
          };
          this._snackBar.open('Added new recipe', 'OK');
          return updatedState;
        });
        ctx.dispatch(new AddRecipeSuccess())
      })
    );
  }

  @Action(FilterRecipes)
  filterRecipes(ctx: StateContext<RecipesStateModel>, action: FilterRecipes): void {
    const state: RecipesStateModel = ctx.getState();
    ctx.setState({
      ...state,
      searchTerm: action.searchTerm
    });
  }

  @Selector()
  static filteredRecipes(state: RecipesStateModel): Recipe[] {
    const searchTerm : string | null = state.searchTerm;
    if (!searchTerm) {
      return state.recipes;
    }

    return state.recipes.filter((recipe: Recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

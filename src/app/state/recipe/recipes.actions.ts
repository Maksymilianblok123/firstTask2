import { Recipe } from '../../shared/interfaces/recipe/recipe';

export class GetRecipes {
  static readonly type = '[Recipes] Get Recipes';
}

export class GetRecipe {
  static readonly type = '[Recipes] Get Recipe';
  constructor(public payload: string) {}
}

export class DeleteRecipe {
  static readonly type = '[Recipes] Delete Recipe';
  constructor(public payload: string) {}
}

export class UpdateRecipe {
  static readonly type = '[Recipes] Update Recipe';
  constructor(public payload: Recipe) {}
}

export class AddRecipe {
  static readonly type = '[Recipes] Add Recipe';
  constructor(public payload: Recipe) {}
}
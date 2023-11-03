import { Injectable } from '@angular/core';
import {Recipe} from "../../shared/interfaces/recipe/recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeList: any[] = [
    {
      // @ts-ignore
      _id: 1,
      name: 'Spaghetti Bolognese'
    },
    {
      // @ts-ignore
      _id: 2,
      name: 'Sushi'
    },
    {
      // @ts-ignore
      _id: 3,
      name: 'Apple pie'
    },
  ]

  getRecipeById(id: string) {
    return this.recipeList.filter(el => el._id === parseInt(id))[0]
  }
  constructor() { }
}

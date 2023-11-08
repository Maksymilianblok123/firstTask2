import {Ingredient} from "../ingredient/ingredient";

export interface Recipe {
  _id: string,
  name: string,
  preparationTimeInMinutes: number,
  description: string,
  ingredients: Ingredient[]
}

import { Injectable } from '@angular/core';
import {Recipe} from "../../shared/interfaces/recipe/recipe";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipeList: any[] = [
    {
      // @ts-ignore
      _id: 1,
      name: 'Spaghetti Bolognese',
      preparationTimeInMinutes: 90,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur est molestias nisi soluta tempora. Accusamus architecto, blanditiis consequatur delectus et laborum minima nulla odit optio placeat qui quis quod, repudiandae!',
      ingredients: [
        {
          _id: '11',
          name: 'tomato',
          quantity: 5,
        },
        {
          _id: '11',
          name: 'tomato',
          quantity: 5,
        },
        {
          _id: '11',
          name: 'tomato',
          quantity: 5,
        },
      ]
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

  private apiEndpoint = 'https://crudcrud.com/api/c658423748ba4e74880027e7e2c082e1/recipe';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get(this.apiEndpoint);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.apiEndpoint}/${id}`);
  }
  updateRecipe(id: number, body: any): Observable<any> {
    return this.http.post(`${this.apiEndpoint}/${id}`, body);
  }

  getRecipeById(id: string) : Recipe {
    return this.recipeList.find(el => el._id === parseInt(id))
  }
}

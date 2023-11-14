import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../types-recipe/recipe";
import {environment} from "../../src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecipesApiService {

  constructor(private _http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this._http.get<Recipe[]>(`${environment.api}`);
  }

  getRecipe(id: string): Observable<Recipe> {
    return this._http.get<Recipe>(`${environment.api}/${id}`);
  }

  deleteRecipe(id: string): Observable<void> {
    return this._http.delete<void>(`${environment.api}/${id}`);
  }
  updateRecipe(body: Recipe): Observable<Recipe> {
    const updatedBody: any = { ...body };
    delete updatedBody._id;

    return this._http.put<Recipe>(`${environment.api}/${body._id}`, updatedBody);
  }

  addRecipe(newRecipe: Recipe): Observable<Recipe> {
    return this._http.post<Recipe>(environment.api, newRecipe);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../../interfaces/recipe/recipe";
import {environment} from "../../../../environments/environment";

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

  deleteRecipe(id: string): Observable<any> {
    return this._http.delete(`${environment.api}/${id}`);
  }
  updateRecipe(body: Recipe): Observable<Recipe> {
    return this._http.put<Recipe>(`${environment.api}/${body._id}`, body);
  }

  addRecipe(newRecipe: Recipe): Observable<Recipe> {
    return this._http.post<Recipe>(environment.api, newRecipe);
  }
}

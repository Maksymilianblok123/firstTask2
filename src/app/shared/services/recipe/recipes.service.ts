import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../../interfaces/recipe/recipe";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get(`${environment.api}`);
  }

  getRecipe(id: string): Observable<any> {
    return this.http.get(`${environment.api}/${id}`);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${environment.api}/${id}`);
  }
  updateRecipe(body: Recipe): Observable<any> {
    return this.http.put(`${environment.api}/${body._id}`, body);
  }

  addRecipe(newRecipe: Recipe) {
    return this.http.post(environment.api, newRecipe);
  }
}

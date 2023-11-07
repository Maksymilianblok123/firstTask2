import { Injectable } from '@angular/core';
import {Recipe} from "../../shared/interfaces/recipe/recipe";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiEndpoint = 'https://crudcrud.com/api/040f92356d27402ca8dd90e69162b591/recipe';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get(this.apiEndpoint);
  }

  getRecipe(id: string): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/${id}`);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.apiEndpoint}/${id}`);
  }
  updateRecipe(body: Recipe): Observable<any> {
    return this.http.put(`${this.apiEndpoint}/${body._id}`, body);
  }
}

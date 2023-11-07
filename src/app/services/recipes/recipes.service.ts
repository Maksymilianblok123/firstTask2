import { Injectable } from '@angular/core';
import {Recipe} from "../../shared/interfaces/recipe/recipe";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiEndpoint = 'https://crudcrud.com/api/4f35d292350445db81c5ff5be593ffa1/recipe';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiEndpoint);
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

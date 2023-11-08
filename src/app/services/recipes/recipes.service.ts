import { Injectable } from '@angular/core';
import {Recipe} from "../../shared/interfaces/recipe/recipe";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiEndpoint = 'https://crudcrud.com/api/4e792512535140a082bf592eed0d4bc0/recipe';

  constructor(private http: HttpClient) { }

  getRecipe(id: string): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/${id}`);
  }

  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`${this.apiEndpoint}/${id}`);
  }
  updateRecipe(body: Recipe): Observable<any> {
    return this.http.put(`${this.apiEndpoint}/${body._id}`, body);
  }

  addRecipe(newRecipe: Recipe) {
    return this.http.post(this.apiEndpoint, newRecipe);
  }
}

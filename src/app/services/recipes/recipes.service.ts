import { Injectable } from '@angular/core';
import {Recipe} from "../../shared/interfaces/recipe/recipe";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiEndpoint = 'https://crudcrud.com/api/d2f6f2920c974697a54da361abb9189e/recipe';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get(this.apiEndpoint);
  }

  getRecipe(id: string): Observable<any> {
    return this.http.get(`${this.apiEndpoint}/${id}`);
  }

  deleteRecipe(id: string): Observable<any> {
    console.log('test')
    return this.http.delete(`${this.apiEndpoint}/${id}`);
  }
  updateRecipe(id: string, body: any): Observable<any> {
    return this.http.post(`${this.apiEndpoint}/${id}`, body);
  }
}

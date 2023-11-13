import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CommonModule, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RecipeListItemComponent} from "../recipe-list-item/recipe-list-item.component";
import {RecipesFacade} from "../state/recipe/recipes.fascade";
import {Observable} from "rxjs";
import {Select} from "@ngxs/store";
import {RecipesState} from "../state/recipe/recipes.state";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    NgForOf,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    RecipeListItemComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  searchFormControl = new FormControl('');
  @Select(RecipesState.filteredRecipes) filteredRecipes$!: Observable<Recipe[]>;


  constructor(
      private _recipeFacade: RecipesFacade,
  ) {
  }

  ngOnInit() {
    this._recipeFacade.getRecipes()

    this.searchFormControl.valueChanges.subscribe((searchTerm: string | null) => {
      this._recipeFacade.updateSearchTerm(searchTerm);
    });
  }

  trackById(index: number, item: Recipe){
    return item._id;
  }

  removeItemFromList(recipeId: string) {
    this._recipeFacade.deleteRecipe(recipeId)
  }

}

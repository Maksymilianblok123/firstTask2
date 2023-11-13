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
  recipes$!: Observable<Recipe[]>;

  constructor(
      private _recipeFacade: RecipesFacade,
  ) {
  }

  ngOnInit() {
    this._recipeFacade.getRecipes()
    this.recipes$ = this._recipeFacade.recipes$;

    this._recipeFacade.recipes$.subscribe(res => {
      console.log(res)
    })

    this.searchFormControl.valueChanges.subscribe((searchTerm) => {
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

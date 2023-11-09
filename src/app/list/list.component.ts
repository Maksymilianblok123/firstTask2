import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {CommonModule, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RecipeListItemComponent} from "../recipe-list-item/recipe-list-item.component";
import {Store} from "@ngxs/store";
import {GetRecipes} from "../state/recipe/recipes.actions";

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
  recipeListInit: Recipe[] = [];
  recipeList: Recipe[] = [];
  recipes$ = this.store.select(state => state.recipes);

  constructor(
      private cdr: ChangeDetectorRef,
      private readonly store: Store
  ) {
  }

ngOnInit() {
  this.store.dispatch(new GetRecipes());
}

  trackById(index: number, item: Recipe){
    return item._id;
  }
  filterRecipes() {
    this.recipeList = this.recipeListInit.filter((recipe) => {
      return recipe.name.toLowerCase().includes(<string>this.searchFormControl.value?.toLowerCase())
    })
  }

  removeItemFromList($event: string) {
    this.recipeListInit.filter((recipe) => {
      return recipe._id !== $event;
    })
    this.cdr.detectChanges();
  }

}

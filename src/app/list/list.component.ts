import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {RecipesService} from "../services/recipes/recipes.service";
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationModalComponent} from "../shared/components/confirmation-modal/confirmation-modal.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecipeListItemComponent} from "../recipe-list-item/recipe-list-item.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
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
  searchFormControl = new FormControl('', [Validators.required, Validators.email]);
  recipeListInit: Recipe[] = [];
  recipeList: Recipe[] = [];

  constructor(
      private recipesService: RecipesService,
      private cdr: ChangeDetectorRef,
  ) {}

ngOnInit() {
    this.getRecipes();
}

getRecipes() {
  this.recipesService.getRecipes()
      .subscribe((recipes: Recipe[]) => {
        this.recipeListInit = recipes
        this.recipeList = recipes
        this.cdr.detectChanges();
      })
}

  recipeId(index: number, item: Recipe){
    return item.name;
  }
  filterRecipes() {
    this.recipeList = this.recipeListInit.filter((recipe) => {
      return recipe.name.toLowerCase().includes(<string>this.searchFormControl.value?.toLowerCase())
    })
  }

  removeItemFromList($event: string) {
    console.log($event)
    this.recipeListInit.filter((recipe) => {
      return recipe._id !== $event;
    })
    this.cdr.detectChanges();
  }
}

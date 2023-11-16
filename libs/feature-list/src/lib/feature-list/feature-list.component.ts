import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Recipe} from "types-recipe";
import {RecipesFacade} from "data-access-recipes";
import {Select} from "@ngxs/store";
import {RecipesState} from "data-access-recipes";
import {Observable, Subscription} from "rxjs";
import {UiRecipeListItemComponent} from "ui-recipe-list-item";

@Component({
  selector: 'lib-feature-list',
  standalone: true,
  imports: [CommonModule, MatInputModule, RouterLink, ReactiveFormsModule, UiRecipeListItemComponent],
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.css'],
})
export class FeatureListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription()
  searchFormControl: FormControl<string | null> = new FormControl('');


  constructor(
    public recipeFacade: RecipesFacade,
  ) {}

  ngOnInit(): void {
    this.recipeFacade.getRecipes()
    this.subscriptions.add(
      this.searchFormControl.valueChanges.subscribe((searchTerm: string | null): void => {
        this.recipeFacade.updateSearchTerm(searchTerm);
      })
    )
  }

  trackById(index: number, item: Recipe): string{
    return item._id;
  }

  removeItemFromList(recipeId: string): void {
    this.recipeFacade.deleteRecipe(recipeId)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
}

import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {RecipesFacade} from "data-access-recipes";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'lib-feature-recipe-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './feature-recipe-details.component.html',
  styleUrls: ['./feature-recipe-details.component.css'],
})
export class FeatureRecipeDetailsComponent implements OnInit, OnChanges {
  constructor(
    public recipesFacade: RecipesFacade,
    private _router: Router,
  ) {}
  @Input() id: string = '';

  ngOnInit(): void {
    this.recipesFacade.getRecipe(this.id);
  }

  ngOnChanges(): void {
    this.recipesFacade.getRecipe(this.id);
  }

  navigateToEdit(id: string | undefined): void {
    this._router.navigate([`recipe/${id}/edit`])
  }

}

import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {RecipesFacade} from "../../../../data-access-recipes/src/lib/data-access-recipes/recipes.fascade";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'lib-feature-recipe-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './feature-recipe-details.component.html',
  styleUrls: ['./feature-recipe-details.component.css'],
})
export class FeatureRecipeDetailsComponent {
  constructor(
    private _router: Router,
    public recipesFacade: RecipesFacade
  ) {}
  @Input() id: string = '';

  ngOnInit() {
    this.recipesFacade.getRecipe(this.id);
  }

  ngOnChanges() {
    this.recipesFacade.getRecipe(this.id);
  }

  navigateToEdit(id: string | undefined) {
    this._router.navigate([`recipe/${id}/edit`])
  }

}

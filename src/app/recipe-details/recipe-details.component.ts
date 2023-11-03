import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipesService} from "../services/recipes/recipes.service";
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailsComponent {
  activeRecipe: Recipe | undefined;
  subscriptions = new Subscription();
  constructor(
      private route: ActivatedRoute,
      private recipeService: RecipesService
  ) {}

  ngOnInit() {
    this.subscriptions.add(
        this.route.params.subscribe((params: Params) => {
          this.activeRecipe = this.recipeService.getRecipeById(params['id'])
        })
    )
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe()
  }

}

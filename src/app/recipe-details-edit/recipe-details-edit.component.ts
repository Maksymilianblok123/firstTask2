import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {RecipesService} from "../services/recipes/recipes.service";
import {Ingredient} from "../shared/interfaces/ingredient/ingredient";

@Component({
  selector: 'app-recipe-details-edit',
  templateUrl: './recipe-details-edit.component.html',
  styleUrls: ['./recipe-details-edit.component.scss']
})
export class RecipeDetailsEditComponent {
  activeRecipe: Recipe | undefined;
  subscriptions = new Subscription();
  constructor(
      private route: ActivatedRoute,
      private recipeService: RecipesService,
      private cdr: ChangeDetectorRef,
) {
  }

  ngOnInit() {
    this.subscriptions.add(
        this.route.params.subscribe((params: Params) => {
          this.recipeService.getRecipe(params['id'])
              .subscribe((res) => {
                  this.activeRecipe = res;
              })
          this.cdr.detectChanges();
        })
    )
  }

    editQnt(quantity: number) {
        console.log(quantity)
    }

    removeItem(item: Ingredient) {
        console.log(item)
    }
}

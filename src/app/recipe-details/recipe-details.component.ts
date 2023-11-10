import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {Store} from "@ngxs/store";
import {GetRecipe} from "../state/recipe/recipes.actions";
import {RecipesFacade} from "../state/recipe/recipes.fascade";

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        NgForOf,
        RouterLink
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailsComponent {
  activeRecipe!: Recipe;
  constructor(
      private cdr: ChangeDetectorRef,
      private router: Router,
      private readonly store: Store,
      private recipesFacade: RecipesFacade
  ) {}
  @Input() id: string = '';

  getActiveRecipe() {
    this.recipesFacade.getRecipe(this.id)
      .subscribe((res) => {
        this.activeRecipe = res;
        this.cdr.detectChanges();
      })
  }

  ngOnInit() {
    this.getActiveRecipe()
  }

  ngOnChanges() {
    this.getActiveRecipe()
  }

    navigateToEdit(id: string ) {
        this.router.navigate([`recipe/${id}/edit`])
    }
}

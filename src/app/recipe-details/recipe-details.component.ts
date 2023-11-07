import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {RecipesService} from "../services/recipes/recipes.service";
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgForOf} from "@angular/common";

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
      private recipeService: RecipesService,
      private cdr: ChangeDetectorRef,
      private router: Router,
  ) {}
  @Input() id: string = '';

  ngOnInit() {
    this.recipeService.getRecipe(this.id)
      .subscribe((res) => {
        this.activeRecipe = res;
        this.cdr.detectChanges();
      })
  }

    navigateToEdit(id: string ) {
        this.router.navigate([`recipe/${id}/edit`])
    }
}

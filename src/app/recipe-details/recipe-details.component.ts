import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {RecipesFacade} from "../state/recipe/recipes.fascade";
import {Observable} from "rxjs";

@Component({
    selector: 'app-recipe-details',
    templateUrl: './recipe-details.component.html',
    styleUrls: ['./recipe-details.component.scss'],
    standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NgForOf,
    RouterLink,
    AsyncPipe,
    CommonModule
  ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailsComponent implements OnInit {
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

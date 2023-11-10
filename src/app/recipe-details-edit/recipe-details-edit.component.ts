import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {Ingredient} from "../shared/interfaces/ingredient/ingredient";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {GetRecipe, UpdateRecipe} from "../state/recipe/recipes.actions";
import {Store} from "@ngxs/store";
import {CommonModule} from "@angular/common";
import {RecipesFacade} from "../state/recipe/recipes.fascade";

@Component({
  selector: 'app-recipe-details-edit',
  templateUrl: './recipe-details-edit.component.html',
  styleUrls: ['./recipe-details-edit.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailsEditComponent {
  @Input() id: string = '';
  activeRecipeForm!: FormGroup;
  activeRecipe$ = this._store.select(state => state.recipes.activeRecipe);
  constructor(
      private _formBuilder: FormBuilder,
      private _snackBar: MatSnackBar,
      private readonly _store: Store,
      private _recipesFacade: RecipesFacade,
) {}

  ngOnInit() {
    this.activeRecipeForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      preparationTimeInMinutes: ['', Validators.required],
      description: [''],
      ingredients: this._formBuilder.array([]),
      _id: ['']
    });

    this._recipesFacade.getRecipe(this.id)
      .subscribe((res: Recipe) => {
        this.activeRecipeForm.patchValue({
          name: res.name,
          description: res.description,
          preparationTimeInMinutes: res.preparationTimeInMinutes,
          _id: res._id,
        });

        this.setIngredients(res.ingredients);
      });
    }

  setIngredients(ingredients: Ingredient[]) {
    const ingredientFormArray = this.activeRecipeForm.get('ingredients') as FormArray;
    ingredientFormArray.clear();

    if (ingredients && ingredients.length > 0) {
      ingredients.forEach((ingredient) => {
        ingredientFormArray.push(
          this._formBuilder.group({
            name: [ingredient.name],
            quantity: [ingredient.quantity],
            _id: [ingredient._id],
          })
        );
      });
    }
  }

  save() {
    this._recipesFacade.updateRecipe(this.activeRecipeForm.value)
  }

}

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {RecipesService} from "../services/recipes/recipes.service";
import {Ingredient} from "../shared/interfaces/ingredient/ingredient";
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-recipe-details-edit',
  templateUrl: './recipe-details-edit.component.html',
  styleUrls: ['./recipe-details-edit.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailsEditComponent {
  @Input() id: string = '';
  activeRecipe!: Recipe;
  activeRecipeForm!: FormGroup;
  constructor(
      private recipeService: RecipesService,
      private formBuilder: FormBuilder,
      private _snackBar: MatSnackBar
) {}

  ngOnInit() {
    this.activeRecipeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      preparationTimeInMinutes: ['', Validators.required],
      description: [''],
      ingredients: this.formBuilder.array([]),
      _id: ['']
    });

    this.recipeService.getRecipe(this.id).subscribe((res: Recipe) => {
      this.activeRecipe = res;
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
          this.formBuilder.group({
            name: [ingredient.name],
            quantity: [ingredient.quantity],
            _id: [ingredient._id],
          })
        );
      });
    }
  }



  save() {
    this.recipeService.updateRecipe(this.activeRecipeForm.value)
      .subscribe(res => {
        this._snackBar.open('Edited item', 'OK');
      })
  }
}

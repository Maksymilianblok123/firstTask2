import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Observable, Subject, takeUntil, withLatestFrom} from "rxjs";
import {Recipe} from "../../../../types-recipe/src/lib/types-recipe/recipe";
import {RecipesFacade} from "../../../../data-access-recipes/src/lib/data-access-recipes/recipes.fascade";
import {Actions, ofActionSuccessful} from "@ngxs/store";
import {AddRecipeSuccess} from "../../../../data-access-recipes/src/lib/data-access-recipes/recipes.actions";
import {Ingredient} from "../../../../types-recipe/src/lib/types-recipe/ingredient";
import {RouterLink} from "@angular/router";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'lib-feature-recipe-details-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, MatInputModule, ReactiveFormsModule],
  templateUrl: './feature-recipe-details-edit.component.html',
  styleUrls: ['./feature-recipe-details-edit.component.css'],
})
export class FeatureRecipeDetailsEditComponent {
  @Input() id: string = '';
  private ngUnsubscribe = new Subject();
  activeRecipeForm!: FormGroup;
  activeRecipe$: Observable<Recipe> | undefined
  constructor(
    private _formBuilder: FormBuilder,
    public recipesFacade: RecipesFacade,
    private _actions$: Actions
  ) {}

  ngOnInit() {
    this.activeRecipeForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      preparationTimeInMinutes: [0, Validators.required],
      description: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]],
      ingredients: this._formBuilder.array([], [this.atLeastTwoIngredientsValidator()]),
      _id: ['']
    });

    this.recipesFacade.getRecipe(this.id);
    this.activeRecipe$ = this.recipesFacade.activeRecipe$;

    this._actions$
      .pipe(
        ofActionSuccessful(AddRecipeSuccess),
        withLatestFrom(this.activeRecipe$),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(([action, activeRecipe]) => {
        if (activeRecipe) {
          this.activeRecipeForm.patchValue({
            name: activeRecipe.name,
            description: activeRecipe.description,
            preparationTimeInMinutes: activeRecipe.preparationTimeInMinutes,
            _id: activeRecipe._id,
          });
          this.setIngredients(activeRecipe.ingredients);
        }
      });
  }

  ngOnChanges() {
    this.recipesFacade.getRecipe(this.id);
  }

  setIngredients(ingredients: Ingredient[]) {
    const ingredientFormArray = this.activeRecipeForm.get('ingredients') as FormArray;
    ingredientFormArray.clear();

    if (ingredients && ingredients.length > 0) {
      ingredients.forEach((ingredient: Ingredient) => {
        ingredientFormArray.push(
          this._formBuilder.group({
            name: [ingredient.name, Validators.required],
            quantity: [ingredient.quantity],
            _id: [ingredient._id],
          })
        );
      });
    }
  }

  addIngredient(): void {
    const ingredientFormArray = this.activeRecipeForm.get('ingredients') as FormArray;
    ingredientFormArray.push(
      this._formBuilder.group({
        name: [''],
        quantity: [''],
      })
    );
  }

  removeIngredient(index: number): void {
    const ingredientFormArray = this.activeRecipeForm.get('ingredients') as FormArray;
    ingredientFormArray.removeAt(index);
  }

  getIngredientsControls(): AbstractControl[] {
    const ingredientFormArray = this.activeRecipeForm.get('ingredients') as FormArray;
    return ingredientFormArray.controls;
  }

  save() {
    this.recipesFacade.updateRecipe(this.activeRecipeForm.value)
  }

  atLeastTwoIngredientsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if ((control as FormArray).controls.length >= 2) {
        return null;
      } else {
        return { atLeastTwoIngredients: true };
      }
    };
  }
}

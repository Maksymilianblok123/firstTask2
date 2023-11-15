import {ChangeDetectorRef, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Subject, takeUntil} from "rxjs";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {RecipesFacade} from "../../../../data-access-recipes/src/lib/data-access-recipes/recipes.fascade";
import {Actions, ofActionSuccessful} from "@ngxs/store";
import {AddRecipeSuccess} from "../../../../data-access-recipes/src/lib/data-access-recipes/recipes.actions";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'lib-feature-recipe-item-add',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './feature-recipe-item-add.component.html',
  styleUrls: ['./feature-recipe-item-add.component.css'],
})
export class FeatureRecipeItemAddComponent {
  private ngUnsubscribe = new Subject();
  recipeForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]),
    preparationTimeInMinutes: new FormControl(0, [Validators.min(0), Validators.required]),
    description: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]),
    ingredients: new FormArray([this.createIngredientGroup()], this.atLeastTwoIngredientsValidator())
  });

  constructor(
    private _fb: FormBuilder,
    private _recipeFacade: RecipesFacade,
    private _actions$: Actions,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.recipeForm = this._fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      preparationTimeInMinutes: [0, [Validators.min(0), Validators.required]],
      description: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]],
      ingredients: this._fb.array([this.createIngredientGroup()], [this.atLeastTwoIngredientsValidator()])
    });

    this._actions$
      .pipe(
        ofActionSuccessful(AddRecipeSuccess),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        this.recipeForm.reset();
        this.recipeForm.markAsUntouched();
        this._cdr.detectChanges();
      });
  }

  createIngredientGroup(): FormGroup {
    return this._fb.group({
      name: ['', Validators.required],
      quantity: [0, Validators.min(0)],
    });
  }

  getIngredientControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  addIngredient() {
    const ingredients = this.recipeForm.get('ingredients') as FormArray;
    ingredients.push(this.createIngredientGroup());
  }

  removeIngredient(index: number) {
    const ingredients = this.recipeForm.get('ingredients') as FormArray;
    ingredients.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this._recipeFacade.addRecipe(this.recipeForm.value)
    }
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

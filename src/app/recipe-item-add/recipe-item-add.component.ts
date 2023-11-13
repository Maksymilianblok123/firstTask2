import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule, ValidatorFn,
  Validators
} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {RecipesFacade} from "../state/recipe/recipes.fascade";
import {Actions, ofActionSuccessful} from "@ngxs/store";
import {Subject, takeUntil} from "rxjs";
import {AddRecipeSuccess} from "../state/recipe/recipes.actions";

@Component({
  selector: 'app-recipe-item-add',
  templateUrl: './recipe-item-add.component.html',
  styleUrls: ['./recipe-item-add.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    NgForOf
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeItemAddComponent {
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
      const ingredientsArray = this.recipeForm?.value?.ingredients
      if (ingredientsArray && ingredientsArray.length >= 2) {
        return null;
      } else {
        return { atLeastTwoIngredients: true };
      }
    };
  }

}

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Recipe} from "../shared/interfaces/recipe/recipe";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {RecipesFacade} from "../state/recipe/recipes.fascade";

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
  recipeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    preparationTimeInMinutes: new FormControl(0, Validators.min(0)),
    description: new FormControl(''),
    ingredients: new FormArray([this.createIngredientGroup()])
  });

  constructor(
    private _fb: FormBuilder,
    private _recipeFacade: RecipesFacade
  ) {}

  ngOnInit(): void {
    this.recipeForm = this._fb.group({
      name: ['', Validators.required],
      preparationTimeInMinutes: [0, Validators.min(0)],
      description: [''],
      ingredients: this._fb.array([this.createIngredientGroup()])
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
      const newRecipe: Recipe = this.recipeForm.value;
      this._recipeFacade.addRecipe(newRecipe)
        .subscribe(() => {
          this.recipeForm.reset();
        })
    }
  }
}

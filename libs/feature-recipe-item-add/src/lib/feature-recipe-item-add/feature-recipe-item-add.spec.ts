import {Spectator, createComponentFactory, typeInElement} from '@ngneat/spectator';
import { RecipeItemAddComponent } from 'feature-recipe-item-add';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesFacade } from 'data-access-recipes';

describe('RecipeItemAddComponent', (): void => {
  let spectator: Spectator<RecipeItemAddComponent>;
  const createComponent = createComponentFactory({
    component: RecipeItemAddComponent,
    imports: [ReactiveFormsModule],
    providers: [
      {
        provide: RecipesFacade,
        useValue: {
          addRecipe: jest.fn()
        }
      }
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have valid initial form values', (): void => {
    const expectedFormValues = {
      name: '',
      preparationTimeInMinutes: 0,
      description: '',
      ingredients: [{ name: '', quantity: 0 }]
    };

    expect(spectator.component.recipeForm.value).toEqual(expectedFormValues);
    expect(spectator.component.recipeForm.valid).toBeFalsy();
  });

  it('should add ingredient to the form', () => {
    const initialIngredientsLength = spectator.component.getIngredientControls().length;

    spectator.component.addIngredient();

    const updatedIngredientsLength = spectator.component.getIngredientControls().length;
    expect(updatedIngredientsLength).toBe(initialIngredientsLength + 1);
  });

  it('should remove ingredient from the form', () => {
    const initialIngredientsLength = spectator.component.getIngredientControls().length;

    spectator.component.removeIngredient(0);

    const updatedIngredientsLength = spectator.component.getIngredientControls().length;
    expect(updatedIngredientsLength).toBe(initialIngredientsLength - 1);
  });

  it('should validate name field', () => {
    const nameControl = spectator.component.recipeForm.get('name');

    if(nameControl) {
      expect(nameControl.valid).toBeFalsy();

      nameControl.setValue('ab');
      expect(nameControl.hasError('minlength')).toBeTruthy();

      nameControl.setValue('Delicious Recipe');
      expect(nameControl.valid).toBeTruthy();
    }
  });

  it('should validate preparationTimeInMinutes field', () => {
    const prepTimeControl = spectator.component.recipeForm.get('preparationTimeInMinutes');
    if(prepTimeControl) {
      expect(prepTimeControl.valid).toBeFalsy();

      prepTimeControl.setValue(-5);
      expect(prepTimeControl.hasError('min')).toBeTruthy();

      prepTimeControl.setValue(30);
      expect(prepTimeControl.valid).toBeTruthy();
    }
  });

  it('should validate description field', () => {
    const descriptionControl = spectator.component.recipeForm.get('description');

    if(descriptionControl) {
      expect(descriptionControl.valid).toBeFalsy();

      descriptionControl.setValue('Short description');
      expect(descriptionControl.hasError('minlength')).toBeTruthy();

      descriptionControl.setValue('This is a long and detailed description of the recipe.');
      expect(descriptionControl.valid).toBeTruthy();
    }
  });

  it('should have the submit button initially disabled', () => {
    const submitButton: HTMLButtonElement | null = spectator.query<HTMLButtonElement>('button[type="submit"]');
    if(submitButton) {
      expect(submitButton.disabled).toBeTruthy();
    }
  });

  it('should enable the submit button when the form is valid', () => {
    const submitButton: HTMLButtonElement | null = spectator.query<HTMLButtonElement>('button[type="submit"]');
    const nameInput: HTMLElement | null = spectator.query('input[formControlName="name"]');
    const prepTimeInput: HTMLElement | null = spectator.query('input[formControlName="preparationTimeInMinutes"]');
    const descriptionInput: HTMLElement | null = spectator.query('textarea[formControlName="description"]');

    if(nameInput && prepTimeInput && descriptionInput && submitButton) {
      typeInElement('Delicious Recipe', nameInput);
      typeInElement('30', prepTimeInput);
      typeInElement('This is a long and detailed description of the recipe.', descriptionInput);

      expect(submitButton.disabled).toBeFalsy();
    }
  });

});

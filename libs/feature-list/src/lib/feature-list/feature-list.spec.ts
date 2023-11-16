import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { ListComponent } from 'feature-list';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipesFacade } from 'data-access-recipes';

describe('ListComponent', () => {
  let spectator: Spectator<ListComponent>;
  let recipesFacade: RecipesFacade;

  const createComponent = createComponentFactory({
    component: ListComponent,
    imports: [
      CommonModule,
      MatInputModule,
      ReactiveFormsModule,
      RouterTestingModule.withRoutes([]),
    ],
    declarations: [],
    mocks: [
      RecipesFacade,
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    recipesFacade = spectator.inject(RecipesFacade);
    spectator.component.searchFormControl = new FormControl(null);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('ngOnInit should call updateSearchTerm with value from searchFormControl', (): void => {
    const searchTerm: string = 'test';
    spectator.component.ngOnInit();
    spectator.component.searchFormControl.setValue(searchTerm);
    expect(recipesFacade.updateSearchTerm).toHaveBeenCalledWith(searchTerm);
  });

  it('ngOnDestroy should unsubscribe from subscriptions', (): void => {
    const unsubscribeSpy = jest.spyOn(spectator.component['subscriptions'], 'unsubscribe');
    spectator.component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('removeItemFromList should call deleteRecipe with provided recipeId', (): void => {
    const recipeId: string = 'some_id';
    spectator.component.removeItemFromList(recipeId);
    expect(recipesFacade.deleteRecipe).toHaveBeenCalledWith(recipeId);
  });
});

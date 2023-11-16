import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { RecipeDetailsComponent } from 'feature-recipe-details';
import { RecipesFacade } from 'data-access-recipes';

describe('RecipeDetailsComponent', (): void => {
  let spectator: Spectator<RecipeDetailsComponent>;
  let recipesFacade: RecipesFacade;

  const createComponent = createComponentFactory({
    component: RecipeDetailsComponent,
    mocks: [RecipesFacade],
  });

  beforeEach((): void => {
    spectator = createComponent();
    recipesFacade = spectator.inject(RecipesFacade);
  });

  it('should call recipesFacade.getRecipe when ngOnChanges is triggered', (): void => {
    const someId: string = '3';
    spectator.setInput('id', someId);
    spectator.component.ngOnChanges();

    expect(recipesFacade.getRecipe).toHaveBeenCalledWith(someId);
  });

  it('should navigate to edit page when navigateToEdit is called', (): void => {
    const routerSpy = jest.spyOn(spectator.component['_router'], 'navigate');
    const someId: string = 'some_id';
    spectator.component.navigateToEdit(someId);

    expect(routerSpy).toHaveBeenCalledWith([`recipe/${someId}/edit`]);
  });
});

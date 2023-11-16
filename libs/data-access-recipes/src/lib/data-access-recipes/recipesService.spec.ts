import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecipesApiService } from 'data-access-recipes';
import { environment } from '../../../../../apps/src/environment/environment';
import {Recipe} from "types-recipe";

describe('RecipesApiService', (): void => {
  let spectator: SpectatorService<RecipesApiService>;
  let httpMock: HttpTestingController;
  const dummyRecipe: Recipe = {
    "_id": "65548caff3272103e862c66b",
    "name": "Apple Pie",
    "preparationTimeInMinutes": 60,
    "description": "Homemade apple pie with a flaky crust and sweet apple filling.",
    "ingredients": [
      {
        "_id": "asdafsgsr1231dsada",
        "name": "Pie Crust",
        "quantity": 23
      },
      {
        "_id": "xdgdfedtewrq12",
        "name": "Apples",
        "quantity": 5
      },
      {
        "_id": "asfshfghdascsd",
        "name": "Sugar",
        "quantity": 3
      },
      {
        "_id": "1243tgergdvsr23",
        "name": "Cinnamon",
        "quantity": 2
      },
      {
        "_id": "asdadsasd1321321",
        "name": "Butter",
        "quantity": 15
      }
    ]
  };
  const dummyRecipes: Recipe[] = [dummyRecipe, dummyRecipe];

  const createService = createServiceFactory({
    service: RecipesApiService,
    imports: [HttpClientTestingModule],
  });

  const testSetup = () => {
    const spectator = createService();
    const httpMock = spectator.inject(HttpTestingController);

    return { service: spectator.service, spectator, httpMock };
  };

  beforeEach(() => {
    const setup = testSetup();
    spectator = setup.spectator;
    httpMock = setup.httpMock;
  });

  afterEach((): void => {
    httpMock.verify();
  });

  it('should retrieve recipes', (): void => {
    spectator.service.getRecipes().subscribe((recipes: Recipe[]): void => {
      expect(recipes).toEqual(dummyRecipes);
    });

    const req = httpMock.expectOne(environment.api);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRecipes);
  });

  it('should retrieve a recipe by ID', (): void => {
    const id: string = 'some_id';

    spectator.service.getRecipe(id).subscribe((recipe: Recipe): void => {
      expect(recipe).toEqual(dummyRecipe);
    });

    const req = httpMock.expectOne(`${environment.api}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRecipe);
  });

  it('should delete a recipe by ID', (): void => {
    const id: string = 'some_id';

    spectator.service.deleteRecipe(id).subscribe();

    const req = httpMock.expectOne(`${environment.api}/${id}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should update a recipe', () => {
    spectator.service.updateRecipe(dummyRecipe).subscribe((updatedRecipe: Recipe): void => {
      expect(updatedRecipe).toEqual(dummyRecipe);
    });

    const req = httpMock.expectOne(`${environment.api}/${dummyRecipe._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyRecipe);
  });

  it('should add a new recipe', (): void => {
    spectator.service.addRecipe(dummyRecipe).subscribe((newRecipe: Recipe): void => {
      expect(newRecipe).toEqual(dummyRecipe);
    });

    const req = httpMock.expectOne(environment.api);
    expect(req.request.method).toBe('POST');
    req.flush(dummyRecipe);
  });
});

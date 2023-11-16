import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../../apps/src/environment/environment';
import {RecipesApiService} from "data-access-recipes";

describe('RecipesApiService', () => {
  let service: RecipesApiService;
  let httpMock: HttpTestingController;
  const dummyRecipe = {
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
  }
  const dummyRecipes = [dummyRecipe, dummyRecipe]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipesApiService]
    });
    service = TestBed.inject(RecipesApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve recipes', () => {

    service.getRecipes().subscribe((recipes) => {
      expect(recipes).toEqual(dummyRecipes);
    });

    const req = httpMock.expectOne(`${environment.api}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRecipes);
  });

  it('should retrieve a recipe by ID', () => {
    const id = 'some_id';

    service.getRecipe(id).subscribe((recipe) => {
      expect(recipe).toEqual(dummyRecipe);
    });

    const req = httpMock.expectOne(`${environment.api}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRecipe);
  });

  it('should delete a recipe by ID', () => {
    const id = 'some_id';

    service.deleteRecipe(id).subscribe();

    const req = httpMock.expectOne(`${environment.api}/${id}`);
    expect(req.request.method).toBe('DELETE');
  });

  it('should update a recipe', () => {
    service.updateRecipe(dummyRecipe).subscribe((updatedRecipe) => {
      expect(updatedRecipe).toEqual(dummyRecipe);
    });

    const req = httpMock.expectOne(`${environment.api}/${dummyRecipe._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyRecipe);
  });

  it('should add a new recipe', () => {
    service.addRecipe(dummyRecipe).subscribe((newRecipe) => {
      expect(newRecipe).toEqual(dummyRecipe);
    });

    const req = httpMock.expectOne(environment.api);
    expect(req.request.method).toBe('POST');
    req.flush(dummyRecipe);
  });
});

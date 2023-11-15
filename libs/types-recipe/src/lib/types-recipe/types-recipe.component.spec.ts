import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypesRecipeComponent } from './types-recipe.component';

describe('TypesRecipeComponent', () => {
  let component: TypesRecipeComponent;
  let fixture: ComponentFixture<TypesRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesRecipeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypesRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

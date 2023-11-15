import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureRecipeDetailsEditComponent } from './feature-recipe-details-edit.component';

describe('FeatureRecipeDetailsEditComponent', () => {
  let component: FeatureRecipeDetailsEditComponent;
  let fixture: ComponentFixture<FeatureRecipeDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureRecipeDetailsEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureRecipeDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureRecipeDetailsComponent } from './feature-recipe-details.component';

describe('FeatureRecipeDetailsComponent', () => {
  let component: FeatureRecipeDetailsComponent;
  let fixture: ComponentFixture<FeatureRecipeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureRecipeDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureRecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

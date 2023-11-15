import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureRecipeItemAddComponent } from './feature-recipe-item-add.component';

describe('FeatureRecipeItemAddComponent', () => {
  let component: FeatureRecipeItemAddComponent;
  let fixture: ComponentFixture<FeatureRecipeItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureRecipeItemAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureRecipeItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

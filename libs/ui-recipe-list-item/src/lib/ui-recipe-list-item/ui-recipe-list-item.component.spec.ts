import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiRecipeListItemComponent } from './ui-recipe-list-item.component';

describe('UiRecipeListItemComponent', () => {
  let component: UiRecipeListItemComponent;
  let fixture: ComponentFixture<UiRecipeListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiRecipeListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiRecipeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

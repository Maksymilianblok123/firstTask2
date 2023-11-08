import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemAddComponent } from './recipe-item-add.component';

describe('RecipeItemAddComponent', () => {
  let component: RecipeItemAddComponent;
  let fixture: ComponentFixture<RecipeItemAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeItemAddComponent]
    });
    fixture = TestBed.createComponent(RecipeItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

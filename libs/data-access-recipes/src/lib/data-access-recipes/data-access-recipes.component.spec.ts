import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataAccessRecipesComponent } from './data-access-recipes.component';

describe('DataAccessRecipesComponent', () => {
  let component: DataAccessRecipesComponent;
  let fixture: ComponentFixture<DataAccessRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAccessRecipesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataAccessRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiSingleListItemComponent } from './ui-single-list-item.component';

describe('UiSingleListItemComponent', () => {
  let component: UiSingleListItemComponent;
  let fixture: ComponentFixture<UiSingleListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSingleListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiSingleListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

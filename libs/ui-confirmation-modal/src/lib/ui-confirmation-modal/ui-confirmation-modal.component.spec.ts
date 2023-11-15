import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiConfirmationModalComponent } from './ui-confirmation-modal.component';

describe('UiConfirmationModalComponent', () => {
  let component: UiConfirmationModalComponent;
  let fixture: ComponentFixture<UiConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiConfirmationModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiAuthorDialogComponent } from './ui-author-dialog.component';

describe('UiAuthorDialogComponent', () => {
  let component: UiAuthorDialogComponent;
  let fixture: ComponentFixture<UiAuthorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiAuthorDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UiAuthorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureNavbarComponent } from './feature-navbar.component';

describe('FeatureNavbarComponent', () => {
  let component: FeatureNavbarComponent;
  let fixture: ComponentFixture<FeatureNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizedSieveComponent } from './optimized-sieve.component';

describe('OptimizedSieveComponent', () => {
  let component: OptimizedSieveComponent;
  let fixture: ComponentFixture<OptimizedSieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptimizedSieveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptimizedSieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFirstNPrimesComponent } from './find-first-nprimes.component';

describe('FindFirstNPrimesComponent', () => {
  let component: FindFirstNPrimesComponent;
  let fixture: ComponentFixture<FindFirstNPrimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindFirstNPrimesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindFirstNPrimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsPrimeComponent } from './is-prime.component';

describe('IsPrimeComponent', () => {
  let component: IsPrimeComponent;
  let fixture: ComponentFixture<IsPrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IsPrimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IsPrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

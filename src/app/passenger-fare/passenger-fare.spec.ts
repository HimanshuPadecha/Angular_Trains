import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerFare } from './passenger-fare';

describe('PassengerFare', () => {
  let component: PassengerFare;
  let fixture: ComponentFixture<PassengerFare>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerFare],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerFare);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

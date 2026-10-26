import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingFooter } from './booking-footer';

describe('BookingFooter', () => {
  let component: BookingFooter;
  let fixture: ComponentFixture<BookingFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

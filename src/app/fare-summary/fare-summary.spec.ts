import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareSummary } from './fare-summary';

describe('FareSummary', () => {
  let component: FareSummary;
  let fixture: ComponentFixture<FareSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FareSummary],
    }).compileComponents();

    fixture = TestBed.createComponent(FareSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

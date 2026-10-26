import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneySummary } from './journey-summary';

describe('JourneySummary', () => {
  let component: JourneySummary;
  let fixture: ComponentFixture<JourneySummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneySummary],
    }).compileComponents();

    fixture = TestBed.createComponent(JourneySummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

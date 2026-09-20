import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainCard } from './train-card';

describe('TrainCard', () => {
  let component: TrainCard;
  let fixture: ComponentFixture<TrainCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

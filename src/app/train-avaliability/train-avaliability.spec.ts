import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainAvaliability } from './train-avaliability';

describe('TrainAvaliability', () => {
  let component: TrainAvaliability;
  let fixture: ComponentFixture<TrainAvaliability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainAvaliability],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainAvaliability);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

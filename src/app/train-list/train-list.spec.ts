import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainList } from './train-list';

describe('TrainList', () => {
  let component: TrainList;
  let fixture: ComponentFixture<TrainList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainList],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

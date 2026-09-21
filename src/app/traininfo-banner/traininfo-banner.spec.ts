import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraininfoBanner } from './traininfo-banner';

describe('TraininfoBanner', () => {
  let component: TraininfoBanner;
  let fixture: ComponentFixture<TraininfoBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraininfoBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(TraininfoBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

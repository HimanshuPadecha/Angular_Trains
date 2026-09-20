import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationInput } from './station-input';

describe('StationInput', () => {
  let component: StationInput;
  let fixture: ComponentFixture<StationInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationInput],
    }).compileComponents();

    fixture = TestBed.createComponent(StationInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

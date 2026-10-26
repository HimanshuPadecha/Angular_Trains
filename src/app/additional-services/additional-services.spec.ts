import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalServices } from './additional-services';

describe('AdditionalServices', () => {
  let component: AdditionalServices;
  let fixture: ComponentFixture<AdditionalServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalServices],
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

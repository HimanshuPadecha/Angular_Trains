import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassagerForms } from './passenger-forms';

describe('PassagerForms', () => {
  let component: PassagerForms;
  let fixture: ComponentFixture<PassagerForms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassagerForms],
    }).compileComponents();

    fixture = TestBed.createComponent(PassagerForms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

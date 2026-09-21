import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDisclaimer } from './footer-disclaimer';

describe('FooterDisclaimer', () => {
  let component: FooterDisclaimer;
  let fixture: ComponentFixture<FooterDisclaimer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterDisclaimer],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterDisclaimer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

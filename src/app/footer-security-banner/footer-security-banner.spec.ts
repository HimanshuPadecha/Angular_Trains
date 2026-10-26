import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSecurityBanner } from './footer-security-banner';

describe('FooterSecurityBanner', () => {
  let component: FooterSecurityBanner;
  let fixture: ComponentFixture<FooterSecurityBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSecurityBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterSecurityBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

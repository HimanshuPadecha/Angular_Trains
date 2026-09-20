import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNav } from './mobile-nav';

describe('MobileNav', () => {
  let component: MobileNav;
  let fixture: ComponentFixture<MobileNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNav],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

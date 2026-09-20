import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAccess } from './quick-access';

describe('QuickAccess', () => {
  let component: QuickAccess;
  let fixture: ComponentFixture<QuickAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickAccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

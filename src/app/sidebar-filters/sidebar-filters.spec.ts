import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFilters } from './sidebar-filters';

describe('SidebarFilters', () => {
  let component: SidebarFilters;
  let fixture: ComponentFixture<SidebarFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPanel } from './search-panel';

describe('SearchPanel', () => {
  let component: SearchPanel;
  let fixture: ComponentFixture<SearchPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

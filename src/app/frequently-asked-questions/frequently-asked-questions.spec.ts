import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyAskedQuestions } from './frequently-asked-questions';

describe('FrequentlyAskedQuestions', () => {
  let component: FrequentlyAskedQuestions;
  let fixture: ComponentFixture<FrequentlyAskedQuestions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrequentlyAskedQuestions],
    }).compileComponents();

    fixture = TestBed.createComponent(FrequentlyAskedQuestions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

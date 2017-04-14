import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionEnginesComponent } from './decision-engines.component';

describe('DecisionEnginesComponent', () => {
  let component: DecisionEnginesComponent;
  let fixture: ComponentFixture<DecisionEnginesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionEnginesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionEnginesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsAggregatedComponent } from './options-aggregated.component';

describe('OptionsAggregatedComponent', () => {
  let component: OptionsAggregatedComponent;
  let fixture: ComponentFixture<OptionsAggregatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsAggregatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsAggregatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

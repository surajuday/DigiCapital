import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GainersandlosersComponent } from './gainersandlosers.component';

describe('GainersandlosersComponent', () => {
  let component: GainersandlosersComponent;
  let fixture: ComponentFixture<GainersandlosersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GainersandlosersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GainersandlosersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

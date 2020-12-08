import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoDetailComponent } from './ipo-detail.component';

describe('IpoDetailComponent', () => {
  let component: IpoDetailComponent;
  let fixture: ComponentFixture<IpoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

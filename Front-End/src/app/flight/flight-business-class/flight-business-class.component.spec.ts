import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBusinessClassComponent } from './flight-business-class.component';

describe('FlightBusinessClassComponent', () => {
  let component: FlightBusinessClassComponent;
  let fixture: ComponentFixture<FlightBusinessClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightBusinessClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBusinessClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

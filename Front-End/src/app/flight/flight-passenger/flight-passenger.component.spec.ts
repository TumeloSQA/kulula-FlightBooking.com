import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightPassengerComponent } from './flight-passenger.component';

describe('FlightPassengerComponent', () => {
  let component: FlightPassengerComponent;
  let fixture: ComponentFixture<FlightPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightEconomyClassComponent } from './flight-economy-class.component';

describe('FlightEconomyClassComponent', () => {
  let component: FlightEconomyClassComponent;
  let fixture: ComponentFixture<FlightEconomyClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightEconomyClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightEconomyClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

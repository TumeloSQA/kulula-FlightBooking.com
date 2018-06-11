import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightExtrasComponent } from './flight-extras.component';

describe('FlightExtrasComponent', () => {
  let component: FlightExtrasComponent;
  let fixture: ComponentFixture<FlightExtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightExtrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

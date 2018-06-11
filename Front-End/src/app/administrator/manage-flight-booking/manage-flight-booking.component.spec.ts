import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFlightBookingComponent } from './manage-flight-booking.component';

describe('ManageFlightBookingComponent', () => {
  let component: ManageFlightBookingComponent;
  let fixture: ComponentFixture<ManageFlightBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFlightBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFlightBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

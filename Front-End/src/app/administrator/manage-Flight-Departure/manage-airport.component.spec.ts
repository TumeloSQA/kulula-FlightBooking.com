import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAirportComponent } from './manage-airport.component';

describe('ManageAirportComponent', () => {
  let component: ManageAirportComponent;
  let fixture: ComponentFixture<ManageAirportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAirportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

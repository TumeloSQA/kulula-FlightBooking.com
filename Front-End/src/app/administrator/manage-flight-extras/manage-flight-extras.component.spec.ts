import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFlightExtrasComponent } from './manage-flight-extras.component';

describe('ManageFlightExtrasComponent', () => {
  let component: ManageFlightExtrasComponent;
  let fixture: ComponentFixture<ManageFlightExtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFlightExtrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFlightExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

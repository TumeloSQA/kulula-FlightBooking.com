import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSeatSelectionComponent } from './manage-seat-selection.component';

describe('ManageSeatSelectionComponent', () => {
  let component: ManageSeatSelectionComponent;
  let fixture: ComponentFixture<ManageSeatSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSeatSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSeatSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

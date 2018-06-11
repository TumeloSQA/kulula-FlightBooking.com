import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePreferredClassComponent } from './manage-preferred-class.component';

describe('ManagePreferredClassComponent', () => {
  let component: ManagePreferredClassComponent;
  let fixture: ComponentFixture<ManagePreferredClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePreferredClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePreferredClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

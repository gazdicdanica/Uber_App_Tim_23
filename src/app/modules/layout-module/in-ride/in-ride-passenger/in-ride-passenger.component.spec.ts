import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InRidePassengerComponent } from './in-ride-passenger.component';

describe('InRidePassengerComponent', () => {
  let component: InRidePassengerComponent;
  let fixture: ComponentFixture<InRidePassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InRidePassengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InRidePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

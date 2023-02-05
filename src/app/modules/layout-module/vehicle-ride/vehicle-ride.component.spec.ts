import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRideComponent } from './vehicle-ride.component';

describe('VehicleRideComponent', () => {
  let component: VehicleRideComponent;
  let fixture: ComponentFixture<VehicleRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

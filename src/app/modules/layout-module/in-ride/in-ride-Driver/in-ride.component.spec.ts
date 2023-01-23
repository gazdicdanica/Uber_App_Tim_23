import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InRideComponent } from './in-ride.component';

describe('InRideComponent', () => {
  let component: InRideComponent;
  let fixture: ComponentFixture<InRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

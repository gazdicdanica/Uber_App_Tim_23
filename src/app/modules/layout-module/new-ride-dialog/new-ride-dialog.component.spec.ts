import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRideDialogComponent } from './new-ride-dialog.component';

describe('NewRideDialogComponent', () => {
  let component: NewRideDialogComponent;
  let fixture: ComponentFixture<NewRideDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRideDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

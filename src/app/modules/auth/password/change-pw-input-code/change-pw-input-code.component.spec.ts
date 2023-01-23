import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePwInputCodeComponent } from './change-pw-input-code.component';

describe('ChangePwInputCodeComponent', () => {
  let component: ChangePwInputCodeComponent;
  let fixture: ComponentFixture<ChangePwInputCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePwInputCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePwInputCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

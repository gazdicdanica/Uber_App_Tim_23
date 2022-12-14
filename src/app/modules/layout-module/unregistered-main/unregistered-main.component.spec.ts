import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredMainComponent } from './unregistered-main.component';

describe('UnregisteredMainComponent', () => {
  let component: UnregisteredMainComponent;
  let fixture: ComponentFixture<UnregisteredMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisteredMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

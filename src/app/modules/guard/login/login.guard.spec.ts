import { LoginGuard } from './login.guard';
import { TestBed } from '@angular/core/testing';

describe('LoginGuard', () => {
  let guard : LoginGuard;

  beforeEach(()=> {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoginGuard);
  });


  it('should create an instance', () => {
    expect(guard).toBeTruthy();
  });
});

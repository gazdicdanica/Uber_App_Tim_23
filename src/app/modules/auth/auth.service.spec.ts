import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '../model/user';

const loginData = {
  email: "test@email.com",
  password: "123"
}

const loginResponse = {
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiUk9MRV9VU0VSIn0.lDZ91Wkt8oqPz8JdbqEB_LY74bLVypxNbZ2arITeiSQ",
  refreshToken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiUk9MRV9VU0VSIn0.lDZ91Wkt8oqPz8JdbqEB_LY74bLVypxNbZ2arITeiSQ"
}

const signupData = {
  email : "test@email.com",
  name: "Pera",
  surname : "Peric",
  telephoneNumber : "0691231234",
  password : "123",
  confirmPassword: "123"
}


describe('AuthService', () => {
  let service: AuthService;
  let httpController : HttpTestingController;

  let url = "localhost:8080/api";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call isLoggedIn and return false if not logged in', () => {
    localStorage.removeItem("user");
    let response : boolean = service.isLoggedIn();

    expect(response).toBeFalsy();
  });

  it('should call isLoggedIn and returned true if logged in', ()  => {
    localStorage.setItem("user", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJyb2xlIjoiUk9MRV9VU0VSIn0.lDZ91Wkt8oqPz8JdbqEB_LY74bLVypxNbZ2arITeiSQ");

    let response : boolean = service.isLoggedIn();

    expect(response).toBeTruthy();
  })

  it('should call login and API should return tokens for user', ()=>{
    service.login(loginData).subscribe((data) => {
      expect(data).toEqual(loginResponse);
    });

    const request = httpController.expectOne({
      method: 'POST',
      url: `http://192.168.1.105:8080/api/user/login`
    });
    expect(request.request.body).toEqual(loginData);
    expect(request.request.method).toEqual('POST');
    request.flush(loginResponse);
    
    console.log(" request " +request);
  });

  it('should call login and API should return error', () => {
    service.login(loginData).subscribe(
      () => fail('expected an error, not success'),
      error => expect(error).toBeDefined()
    );
  
    const request = httpController.expectOne({
      method: 'POST',
      url: `http://192.168.1.105:8080/api/user/login`
    });
  
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(loginData);
  
    request.error(new ErrorEvent('error'));
  });

  it('should call signup and API should return same data', () => {
    service.signup(signupData).subscribe((data) => {
      expect(data).toEqual(JSON.stringify(signupData));
    });

    const request = httpController.expectOne({
      method : "POST",
      url: `http://192.168.1.105:8080/api/passenger`
    });
    // expect(request.request.body).toEqual(signupData);
    expect(request.request.method).toEqual('POST');
    request.flush(signupData);
  })
});

import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { By } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Observable, throwError} from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'setUser']);
const invalidData = {email : "invalid", password : "invalid"};
const testData = {email: "test@email.com", password: "123"};
const tokenData = {accessToken : "accessToken", refreshToken: "refreshToken"}

describe('LoginComponent unit tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // let loginSpy;
  let router : Router;
  // let routerSpy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [MatFormFieldModule, MatInputModule, ReactiveFormsModule, 
        FormsModule, AppRoutingModule, NoopAnimationsModule,
      RouterTestingModule, HttpClientModule],
      declarations: [ LoginComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`component initial state`, ()=>{
    expect(component.hasError).toEqual(0);
    expect(component.loginForm).toBeDefined();
    
  });

  it(`blank form should be invalid`, ()=>{
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it(`form should be valid`, ()=>{
    component.loginForm.controls['email'].setValue(testData.email);
    component.loginForm.controls['password'].setValue(testData.password);
    expect(component.loginForm.valid).toBeTruthy();
  });

  it(`should call login()`, fakeAsync(()=>{
    component.loginForm.controls['email'].setValue(testData.email);
    component.loginForm.controls['password'].setValue(testData.password);
    fixture.detectChanges();
    const loginBtn = fixture.debugElement.query(By.css("button"));
    loginBtn.nativeElement.click();
    fixture.detectChanges();

    expect(authServiceSpy.login).toHaveBeenCalled();
  }));

  it(`should route to home if login successfuly`, fakeAsync(()=> {
    component.loginForm.controls['email'].setValue(testData.email);
    component.loginForm.controls['password'].setValue(testData.password);
    fixture.detectChanges();

    const loginBtn = fixture.debugElement.query(By.css("button"));
    loginBtn.nativeElement.click();
    tick();
    fixture.detectChanges();

    authServiceSpy.login.and.returnValue(of(tokenData));
    authServiceSpy.setUser.and.callFake(() => {});
    component.login();
    tick();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(authServiceSpy.setUser).toHaveBeenCalled();
    console.log(localStorage.getItem('user'));
    expect(localStorage.getItem('user')).toEqual('{"accessToken":"'+tokenData.accessToken+'"}');
    expect(localStorage.getItem('email')).toEqual(testData.email);
    expect(localStorage.getItem("refresh")).toEqual('{"refreshToken":"'+tokenData.refreshToken+'"}');
    expect(component.hasError).toEqual(0);

  }));

  it('should show error on error 500', fakeAsync(() =>{
    component.loginForm.controls['email'].setValue(invalidData.email);
    component.loginForm.controls['password'].setValue(invalidData.password);
    const loginBtn = fixture.debugElement.query(By.css("button"));
    loginBtn.nativeElement.click();
    tick();
    fixture.detectChanges();

    authServiceSpy.login.and.returnValue(throwError({status: 500}));
    component.login();
    tick();
    fixture.detectChanges();

    expect(component.hasError).toEqual(1);
    const error = fixture.debugElement.query(By.css("mat-error"));
    expect(error.nativeElement.textContent).toContain("Incorrect username or password");

  }));


  it('should show error on error 400', fakeAsync(() =>{
    component.loginForm.controls['email'].setValue(invalidData.email);
    component.loginForm.controls['password'].setValue(invalidData.password);
    const loginBtn = fixture.debugElement.query(By.css("button"));
    loginBtn.nativeElement.click();
    tick();
    fixture.detectChanges();

    authServiceSpy.login.and.returnValue(throwError({status: 400}));
    component.login();
    tick();
    fixture.detectChanges();

    expect(component.hasError).toEqual(2);
    const error = fixture.debugElement.query(By.css("mat-error"));
    expect(error.nativeElement.textContent).toContain("Incorrect username or password");
  
  }));

  it('should show error on error 404', fakeAsync(() =>{
    component.loginForm.controls['email'].setValue(invalidData.email);
    component.loginForm.controls['password'].setValue(invalidData.password);
    const loginBtn = fixture.debugElement.query(By.css("button"));
    loginBtn.nativeElement.click();
    tick();
    fixture.detectChanges();

    authServiceSpy.login.and.returnValue(throwError({status: 404}));
    component.login();
    tick();
    fixture.detectChanges();

    expect(component.hasError).toEqual(3);
    const error = fixture.debugElement.query(By.css("mat-error"));
    expect(error.nativeElement.textContent).toContain("Incorrect username or password");
  }));

  it('should route on forgot password click', fakeAsync(() => {
    const forgotPassword = fixture.debugElement.query(By.css("#forgot-password > a"));
    forgotPassword.nativeElement.click();
    tick();
    fixture.detectChanges();

    expect(router.url).toBe("/resetPw");
  }));

  it('should route on SIGNUP click', fakeAsync(() => {
    const forgotPassword = fixture.debugElement.query(By.css(".bottom-p-text > a"));
    forgotPassword.nativeElement.click();
    tick();
    fixture.detectChanges();

    expect(router.url).toBe("/signUp");
  }));
  
});

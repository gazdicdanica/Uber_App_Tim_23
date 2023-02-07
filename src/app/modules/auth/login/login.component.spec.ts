import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { By } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

const testData = {email: "test@email.com", password: "123"};

describe('LoginComponent unit tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, AppRoutingModule, NoopAnimationsModule],
      declarations: [ LoginComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
      ]
    })
    .compileComponents();
    loginSpy = authServiceSpy.login.and.returnValue(Promise.resolve(testData));

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

  }))


  
});
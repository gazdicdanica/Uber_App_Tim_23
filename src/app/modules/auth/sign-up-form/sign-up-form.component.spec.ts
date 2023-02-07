import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SignUpFormComponent } from './sign-up-form.component';
import { AuthService } from '../auth.service';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';


const testData = {email: 'test3@email.com', name: 'testName', surname: 'testSurname', phone: '0649911442',
                  password: 'sifra123#', confirmPassword: 'sifra123#'}

const authServiceSpy = jasmine.createSpyObj('AuthService', ['signup'])
describe('SignUpFormComponent Unit Tests', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;
  let router: Router;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, AppRoutingModule, NoopAnimationsModule],
      declarations: [ SignUpFormComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
      ]
    })
    .compileComponents();
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component Inital State', ()=>{
    expect(component.responseError).toEqual(false);
    expect(component.signUpForm).toBeDefined();
  }); 

  it('should make blank form invalid', ()=>{
    component.signUpForm.controls['email'].setValue('');
    component.signUpForm.controls['name'].setValue('');
    component.signUpForm.controls['surname'].setValue('');
    component.signUpForm.controls['telephoneNumber'].setValue('');
    component.signUpForm.controls['password'].setValue('');
    component.signUpForm.controls['confirmPassword'].setValue('');
    expect(component.signUpForm.valid).toBeFalse();
  });

  it('should be invalid for missing input email', ()=> {
    component.signUpForm.controls['email'].setValue("");
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should be invalid for missing input name', ()=> {
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue('');
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should be invalid for missing surname', ()=> {
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue('');
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should be invalid for missing phone', ()=> {
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue('');
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should be invalid for missing password', ()=> {
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue('');
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should be invalid for missing confirm password', ()=> {
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue('');
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should be invalid for non matching passwords', ()=> {
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue("testData.password");
    component.signUpForm.controls['confirmPassword'].setValue("testData.confirmPassword");
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should be invalid for invalid email format', ()=> {
    component.signUpForm.controls['email'].setValue("someValue");
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should be invalid for invalid phone number format', ()=> {
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue("someValue");
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    expect(component.signUpForm.valid).toBeFalsy();
  });

  it('should be valid', ()=> {
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    expect(component.signUpForm.valid).toBeTruthy();
  });

  it('should call signup', fakeAsync(()=> {
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    fixture.detectChanges();
    const signUpBtn = fixture.debugElement.query(By.css('.form-btn'));
    signUpBtn.nativeElement.click();
    fixture.detectChanges();

    expect(authServiceSpy.signup).toHaveBeenCalled();
  }));

  it('responseError variable should be set to true in case of an unseccessful API call', ()=>{
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    authServiceSpy.signup.and.returnValue(throwError(() => new Error('test')));

    component.signUp();
    fixture.detectChanges();
    expect(component.responseError).toBeTruthy();
  });

  it('valid API call should call router.navigate ', ()=>{
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    authServiceSpy.signup.and.returnValue(of({}));

    component.signUp();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('valid API call should navigate to main', ()=>{
    component.signUpForm.controls['email'].setValue(testData.email);
    component.signUpForm.controls['name'].setValue(testData.name);
    component.signUpForm.controls['surname'].setValue(testData.surname);
    component.signUpForm.controls['telephoneNumber'].setValue(testData.phone);
    component.signUpForm.controls['password'].setValue(testData.password);
    component.signUpForm.controls['confirmPassword'].setValue(testData.confirmPassword);
    authServiceSpy.signup.and.returnValue(of({}));
    
    component.signUp();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

});

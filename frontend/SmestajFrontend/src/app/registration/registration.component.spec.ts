import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RegistrationComponent } from './registration.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RegisterResponseDTO } from '../dtos/RegistrationDtos';
import { Router } from '@angular/router';

describe('RegistrationComponent', () => {
  let router: Router;
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [RegistrationComponent],
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a disabled button initially', () => {
    expect(component.isDisabled).toBeTruthy();
  });

  it('should enable button when form is valid', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeFalsy();
  });

  it('should disable button when form is invalid', () => {
    component.registerForm.setValue({
      email: 'invalid-email',
      password: 'no',
      repeatPassword: 'Password123!',
      name: '1',
      surname: '2',
      phone: 'invalid-phone',
      address: '',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
  });

  it('should have empty fields initially', () => {
    expect(component.registerForm.get('email')?.value).toEqual('');
    expect(component.registerForm.get('password')?.value).toEqual('');
    expect(component.registerForm.get('repeatPassword')?.value).toEqual('');
    expect(component.registerForm.get('name')?.value).toEqual('');
    expect(component.registerForm.get('surname')?.value).toEqual('');
    expect(component.registerForm.get('phone')?.value).toEqual('');
    expect(component.registerForm.get('address')?.value).toEqual('');
    expect(component.registerForm.get('roleOption')?.value).toEqual('OWNER');
    expect(component.isDisabled).toBeTruthy();
  });

  it('empty form should be invalid', () => {
    spyOn(component, 'register').and.callThrough();
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['password'].setValue('');
    component.registerForm.controls['repeatPassword'].setValue('');
    component.registerForm.controls['name'].setValue('');
    component.registerForm.controls['surname'].setValue('');
    component.registerForm.controls['address'].setValue('');
    component.registerForm.controls['phone'].setValue('');
    component.registerForm.controls['roleOption'].setValue('');

    fixture.detectChanges();
    expect(component.registerForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });

  it('should not call register method when form invalid', () => {
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });



  it('should be able to make input into all form fields', () => {
    let el = fixture.debugElement.query(By.css('[formControlName=\'email\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);
    el = fixture.debugElement.query(By.css('[formControlName=\'password\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);
    el = fixture.debugElement.query(By.css('[formControlName=\'repeatPassword\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);
    el = fixture.debugElement.query(By.css('[formControlName=\'name\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);
    el = fixture.debugElement.query(By.css('[formControlName=\'surname\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);
    el = fixture.debugElement.query(By.css('[formControlName=\'phone\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);
    el = fixture.debugElement.query(By.css('[formControlName=\'address\']')).nativeElement;
    expect(el.getAttribute('readonly')).toEqual(null);

  });

  it('should call registerUser method on correct form submission', fakeAsync(() => {
    spyOn(router, 'navigate');
    spyOn(component, 'register').and.callThrough();
    spyOn(component.userData, 'registerUser').and.returnValue(
      of({
        id: 1,
        name: 'Kris',
        surname: 'Tina',
        email: 'andrijinkristina@gmail.com'
      } as RegisterResponseDTO)
    );

    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    // component.register();
    fixture.detectChanges();  

    expect(component.isDisabled).toBeFalsy();

    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
    expect(component.register).toHaveBeenCalledTimes(1);

  }));

  it('form should be invalid when email is empty', () => {
    component.registerForm.setValue({
      email: '',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid when email is invalid', () => {
    component.registerForm.setValue({
      email: 'blablabla',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#emailInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when name is empty', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: '',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid when name is invalid (numeric values)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris123',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#nameInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when name is invalid (special characters)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris_',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#nameInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when surname is empty', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: '',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid when surname is invalid (numeric values)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina123',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#surnameInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when surname is invalid (special characters)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina_',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#surnameInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when phone is empty', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid when phone is invalid (alpha values)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789asc',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#phoneInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when phone is invalid (special characters)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina_',
      phone: '123456789_',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#phoneInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when role is empty', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123',
      address: 'pakao',
      roleOption: '',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid when password is empty', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: '',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid when password is invalid (no upper letters)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'rtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#passwordInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when password is invalid (no lower letters)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWE123456_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#passwordInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when password is invalid (no numbers)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'rtzwwwwwwwwwwwwwQ_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#passwordInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when password is invalid (no special characters)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'rtzwwwwwwwwwwwwwQ123',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#passwordInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when password is invalid (not long enough)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'rQ1_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#passwordInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when repeatPassword is empty', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: '',
      name: 'Kris',
      surname: 'Tina',
      phone: '123',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid when repeatPassword is invalid (no upper letters)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'oooooooooortz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#repeatPasswordInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when repeatPassword is invalid (no lower letters)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWE123456_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#repeatPasswordInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when repeatPassword is invalid (no numbers)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'rtzwwwwwwwwwwwwwQ_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#repeatPasswordInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when repeatPassword is invalid (no special characters)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'rtzwwwwwwwwwwwwwQ123',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#repeatPasswordInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when repeatPassword is invalid (not long enough)', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'Qr1_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: 'pakao',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
    const divElement = fixture.debugElement.nativeElement.querySelector('#repeatPasswordInvalid');
    expect(divElement).toBeTruthy();
  });

  it('form should be invalid when password and repeatPassword do not match', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_2',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: '',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });

  it('form should be invalid when address is empty', () => {
    component.registerForm.setValue({
      email: 'andrijinkristina@gmail.com',
      password: 'QWErtz123_',
      repeatPassword: 'QWErtz123_',
      name: 'Kris',
      surname: 'Tina',
      phone: '123456789',
      address: '',
      roleOption: 'OWNER',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    spyOn(component, 'register').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#sign-up');
    button.click();
    expect(component.register).toHaveBeenCalledTimes(0);
  });

});

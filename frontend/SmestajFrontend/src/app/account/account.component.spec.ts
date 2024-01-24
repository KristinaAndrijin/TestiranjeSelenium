import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { UserDTO } from '../dtos/UserDTOs';
import { Router } from '@angular/router';
import { UserdataService } from '../services/userdata.service';
import { JwtService } from '../services/jwt.service';
import { JwtServiceMock } from '../mocks/jwtService.mock';
import { UserdataServiceMock } from '../mocks/userDataService.mock';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let router: Router;
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [AccountComponent],
      providers: [
        {
          provide: JwtService,
          useClass: JwtServiceMock
        },
        {
          provide: UserdataService,
          useClass: UserdataServiceMock
        },
      ]
    }).compileComponents();
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component.jwtService, 'getId').and.returnValue(
      "2"
    );
    spyOn(component.userData, 'getUser').and.returnValue(
      of({
        firstName: "Dusan",
        lastname: "Bibin",
        email: "mail",
        phoneNumber: "12344",
        address: "pakao",
      } as UserDTO)
    );

    spyOn(component.userData, 'editUser').and.returnValue(
      of({
        firstName: "Dusan",
        lastname: "Bibin",
        email: "mail",
        phoneNumber: "12344",
        address: "pakao",
      } as UserDTO)
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a disabled button initially', () => {
    expect(component.isDisabled).toBeFalsy();
  });

  it('should enable button when form is valid', () => {
    component.accountForm.setValue({
      email: 'mail@gmail.com',
      name: 'Dusan',
      surname: 'Bibin',
      phone: '123456789',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeFalsy();
  });

  it('should disable button when form is invalid', () => {
    component.accountForm.setValue({
      email: 'invalid-email',
      name: '1',
      surname: '2',
      phone: 'invalid-phone',
      address: '',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
  });

  it('should have filled fields initially', () => {
    expect(component.accountForm.get('email')?.value).toEqual('mail@gmail.com');
    expect(component.accountForm.get('name')?.value).toEqual('Dusan');
    expect(component.accountForm.get('surname')?.value).toEqual('Bibin');
    expect(component.accountForm.get('phone')?.value).toEqual('12344');
    expect(component.accountForm.get('address')?.value).toEqual('pakao');
    expect(component.isDisabled).toBeFalsy();
  });

  it('empty form should be invalid', () => {
    spyOn(component, 'editAccount').and.callThrough();
    component.accountForm.controls['email'].setValue('');
    component.accountForm.controls['name'].setValue('');
    component.accountForm.controls['surname'].setValue('');
    component.accountForm.controls['address'].setValue('');
    component.accountForm.controls['phone'].setValue('');

    fixture.detectChanges();
    expect(component.accountForm.valid).toBeFalsy();
    let button = fixture.debugElement.nativeElement.querySelector('#edit');
    button.click();
    expect(component.editAccount).toHaveBeenCalledTimes(0);
  });

  it('should be able to make input into all form fields', () => {
    let el = fixture.debugElement.query(By.css('[formControlName=\'email\']')).nativeElement;
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

  it('should call editUser method on correct form submission', fakeAsync(() => {
    spyOn(component, 'editAccount').and.callThrough();
    // spyOn(component.userData, 'editUser').and.returnValue(
    //   of({
    //     firstName: "Dusan",
    //     lastname: "Bibin",
    //     email: "mail@gmail.com",
    //     phoneNumber: "12344",
    //     address: "pakao",
    //   } as UserDTO)
    // );

    component.accountForm.setValue({
      email: 'mejl@gmail.com',
      name: 'Dusan',
      surname: 'Bibin',
      phone: '123456789',
      address: 'pakao',
      btn: '',
    });

    // component.register();
    fixture.detectChanges();  

    expect(component.isDisabled).toBeFalsy();

    let button = fixture.debugElement.nativeElement.querySelector('#edit');
    button.click();
    fixture.detectChanges();
    expect(component.editAccount).toHaveBeenCalledTimes(1);

  }));


  it('form should be invalid when email is empty', () => {
    component.accountForm.setValue({
      email: '',
      name: 'Dusan',
      surname: 'Bibin',
      phone: '123456789',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('form should be invalid when email is invalid', () => {
    component.accountForm.setValue({
      email: 'blablabla',
      name: 'Dusan',
      surname: 'Bibin',
      phone: '123456789',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('form should be invalid when name is empty', () => {
    component.accountForm.setValue({
      email: 'mejl@gmail.com',
      name: '',
      surname: 'Bibin',
      phone: '123456789',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('form should be invalid when name is invalid (numeric values)', () => {
    component.accountForm.setValue({
      email: 'mejl@gmail.com',
      name: '1',
      surname: 'Bibin',
      phone: '123456789',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('form should be invalid when name is invalid (special characters)', () => {
    component.accountForm.setValue({
      email: 'mejl@gmail.com',
      name: '_',
      surname: 'Bibin',
      phone: '123456789',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('form should be invalid when surname is empty', () => {
    component.accountForm.setValue({
      email: 'mejl@gmail.com',
      name: 'Dusan',
      surname: '',
      phone: '123456789',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('form should be invalid when surname is invalid (numeric values)', () => {
    component.accountForm.setValue({
      email: 'mejl@gmail.com',
      name: 'DUsan',
      surname: '5',
      phone: '123456789',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('form should be invalid when surname is invalid (special characters)', () => {
    component.accountForm.setValue({
      email: 'mejl@gmail.com',
      name: 'DUsan',
      surname: '_',
      phone: '123456789',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('form should be invalid when phone is empty', () => {
    component.accountForm.setValue({
      email: 'mejl@gmail.com',
      name: 'Dusan',
      surname: 'Bibin',
      phone: '',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('form should be invalid when phone is invalid (alpha values)', () => {
    component.accountForm.setValue({
      email: 'mejl@gmail.com',
      name: 'DUsan',
      surname: 'Bibin',
      phone: 'lalala',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('form should be invalid when phone is invalid (special characters)', () => {
    component.accountForm.setValue({
      email: 'mejl@gmail.com',
      name: 'DUsan',
      surname: 'Bibin',
      phone: '$&&#$',
      address: 'pakao',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });

  it('form should be invalid when address is empty', () => {
    component.accountForm.setValue({
      email: 'mejl@gmail.com',
      name: 'Dusan',
      surname: 'Bibin',
      phone: '123',
      address: '',
      btn: '',
    });

    expect(component.isDisabled).toBeTruthy();
    expect(component.accountForm.valid).toBeFalsy();
  });
});

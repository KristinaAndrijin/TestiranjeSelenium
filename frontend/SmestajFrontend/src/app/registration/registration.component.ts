import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { RegistrationDTO } from '../dtos/RegistrationDtos';
import { UserdataService } from '../services/userdata.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private http: HttpClient, private userData: UserdataService,private router: Router) {
    this.check = this.check.bind(this); 
  }

  registerForm!: FormGroup;
  isDisabled: boolean = true;
  // roleOption:string[] = ['OWNER','GUEST'];

  ngOnInit(): void {
      this.registerForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        repeatPassword: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        roleOption: new FormControl('OWNER', Validators.required),
        // validationType: new FormControl('', Validators.required),
        btn: new FormControl("")},
        { validators: this.check },
      );
  }

  	customEmailValidator(control: AbstractControl) {
      const custom = control.get('email');
      if (custom?.value == "hej") {
        return { email: true };
      }
      return null;
  }

  register(){
            console.log("jej");
            if(this.registerForm.invalid){
              alert('popunite formu');
              console.log('email:',this.registerForm.get('email')?.valid)
              console.log('password:',this.registerForm.get('password')?.valid)
              console.log('repeatPassword:',this.registerForm.get('repeatPassword')?.valid)
              console.log('name:',this.registerForm.get('name')?.valid)
              console.log('name:',this.registerForm.get('naroleOptionme')?.value)
              return;
            }
            let dto: RegistrationDTO | null = null;
            // console.log('email:',this.registerForm.get('email')?.value)
            //   console.log('password:',this.registerForm.get('password')?.value)
            //   console.log('repeatPassword:',this.registerForm.get('repeatPassword')?.value)
            //   console.log('name:',this.registerForm.get('name')?.value)
            //   console.log('lastName:',this.registerForm.get('surname')?.value)
            //   console.log('phoneNum:',this.registerForm.get('phone')?.value)
            //   console.log('address:',this.registerForm.get('address')?.value)
            //   console.log('role:',this.registerForm.get('roleOption')?.value)

              dto = {
                email: this.registerForm.get('email')?.value,
                password: this.registerForm.get('password')?.value,
                firstName: this.registerForm.get('name')?.value,
                lastName: this.registerForm.get('surname')?.value,
                phoneNumber: this.registerForm.get('phone')?.value,
                address: this.registerForm.get('address')?.value,
                repeatPassword:this.registerForm.get('repeatPassword')?.value,
                role:this.registerForm.get('roleOption')?.value
              }

              console.log(dto);

              this.userData.registerUser(dto).subscribe({
                next: result => {
                  // this.snackBar.open('check email, '+ result.name, undefined, {
                  //   duration: 2000,
                  // });
                  // alert('check email, '+ result.name);
                  this.registerForm.reset();
                  this.router.navigate(['/login'])
                },
                error: e =>
                  {console.log(e?.error?.message);
                    console.log(e);
                    // this.snackBar.open(e?.error?.message, undefined, {
                    //   duration: 2000,
                    // });
                  alert(e?.error?.message);
                  //this.registerForm.reset();
                  }
              })
  }

  //  check(control: AbstractControl) {
  //   // return 
  //   const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,}$/;
  //   const lettersOnlyRegex = /^[A-Za-z]+$/;
  //   const numbersOnlyRegex = /^\d+$/;
  //   const password = control.get('password');
  //   const isValidPassword = passwordRegex.test(password?.value);
  //   const confirmPassword = control.get('repeatPassword');
  //   const isValidRepeatPassword = passwordRegex.test(confirmPassword?.value);
  //   const passwordMatch = password?.value !== confirmPassword?.value;
  //   const cmail = control.get('email');
  //   const isValidEmail = emailRegex.test(cmail?.value);
  //   const name = control.get('name');
  //   const isValidName = lettersOnlyRegex.test(name?.value) && name?.value != undefined && name?.value != null;
  //   const surname = control.get('surname');
  //   const isValidSurname = lettersOnlyRegex.test(surname?.value) && surname?.value != undefined && surname?.value != null;
    // const phoneNumber = control.get('phone');
    // const isPhoneValid = numbersOnlyRegex.test(phoneNumber?.value);
  //   if (isValidEmail && isValidPassword && isValidRepeatPassword && !passwordMatch && isValidName && isValidSurname && isPhoneValid) {
  //     this.isDisabled = false;
  //   } else {
  //     this.isDisabled = true;
  //   }
  //   const errors: { [key: string]: any } = {};
  //   if (!matchPasswords) {
  //     errors['notSame'] = true;
  //   }
  //   if (!isValidEmail) {
  //     errors['validEmail'] = true;
  //   }
  //   if (!isValidPassword) {
  //     errors['validPassword'] = true;
  //   }
  //   if (!isValidRepeatPassword) {
  //     errors['validRepeatPassword'] = true;
  //   }
  //   if (!isValidName) {
  //     errors['validName'] = true;
  //   }
  //   if (!isValidSurname) {
  //     errors['validSurname'] = true;
  //   }
    // if (!isPhoneValid) {
    //   errors['validPN'] = true;
    // }
  //  return Object.keys(errors).length > 0 ? errors : null;
  // }

  check(control: AbstractControl) {
    // return 
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const lettersOnlyRegex = /^[A-Za-z]+$/;
    const numbersOnlyRegex = /^\d+$/;
    const cmail = control.get('email');
    const isValidEmail = emailRegex.test(cmail?.value);
    const name = control.get('name');
    const isValidName = lettersOnlyRegex.test(name?.value) && name?.value != undefined && name?.value != null;
    const surname = control.get('surname');
    const isValidSurname = lettersOnlyRegex.test(surname?.value) && surname?.value != undefined && surname?.value != null;
    const phoneNumber = control.get('phone');
    const isPhoneValid = numbersOnlyRegex.test(phoneNumber?.value);
    if (isValidEmail && isValidName && isValidSurname && isPhoneValid) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
    const errors: { [key: string]: any } = {};
    if (!matchPasswords) {
      errors['notSame'] = true;
    }
    if (!isValidEmail) {
      errors['validEmail'] = true;
    }
    if (!isValidName) {
      errors['validName'] = true;
    }
    if (!isValidSurname) {
      errors['validSurname'] = true;
    }
    if (!isPhoneValid) {
      errors['validPN'] = true;
    }
   return Object.keys(errors).length > 0 ? errors : null;
  }
}

export function matchPasswords(control: AbstractControl) {
  const password = control.get('password');
  const confirmPassword = control.get('repeatPassword');
  if (password?.value !== confirmPassword?.value) {
    return { notSame: true };
  }
  return null;
}
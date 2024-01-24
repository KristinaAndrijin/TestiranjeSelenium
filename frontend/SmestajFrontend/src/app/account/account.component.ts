import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { UserdataService } from '../services/userdata.service';
import { environment } from 'src/environments/environment';
import { JwtService } from '../services/jwt.service';
import { UserDTO } from '../dtos/UserDTOs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  constructor(private http: HttpClient, public userData: UserdataService,private router: Router, public jwtService: JwtService) {
    this.check = this.check.bind(this); 
  }

  accountForm!: FormGroup;
  isDisabled: boolean = true;
  selectedFile!: File;
  filePreview: string | ArrayBuffer | null = null;
  id!: string;
  userOld!: UserDTO

  ngOnInit(): void {
    this.accountForm = new FormGroup({
      name: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      // validationType: new FormControl('', Validators.required),
      btn: new FormControl("")},
      { validators: this.check },
    );
    this.id = this.jwtService.getId() ?? "-1";
    console.log(this.id);
    this.userData.getUser(this.id).subscribe({
      next: result => {
        // this.snackBar.open('check email, '+ result.name, undefined, {
        //   duration: 2000,
        // });
        // console.log(result);
        this.userOld = result;
        // console.log(result);
        // console.log(this.userOld.email);
        this.accountForm = new FormGroup({
          name: new FormControl(this.userOld.firstName, Validators.required),
          surname: new FormControl(this.userOld.lastname, Validators.required),
          phone: new FormControl(this.userOld.phoneNumber, Validators.required),
          address: new FormControl(this.userOld.address, Validators.required),
          email: new FormControl(this.userOld.email, Validators.required),
          // validationType: new FormControl('', Validators.required),
          btn: new FormControl("")},
          { validators: this.check },
        );

        // console.log(this.accountForm.get("email")?.value);
      },
      error: e =>
        {console.log(e?.error?.message);
          // this.snackBar.open(e?.error?.message, undefined, {
          //   duration: 2000,
          // });
        alert(e?.error?.message);
        //this.registerForm.reset();
        }
    })

    // this.accountForm = new FormGroup({
    //   name: new FormControl("", Validators.required),
    //   surname: new FormControl("", Validators.required),
    //   phone: new FormControl("", Validators.required),
    //   address: new FormControl("", Validators.required),
    //   email: new FormControl("", Validators.required),
    //   // validationType: new FormControl('', Validators.required),
    //   btn: new FormControl("")},
    //   { validators: this.check },
    // );
    // console.log(user);
  }

  	customEmailValidator(control: AbstractControl) {
      const custom = control.get('email');
      if (custom?.value == "hej") {
        return { email: true };
      }
      return null;
  }

  editAccount(){
            console.log("jej");
            if(this.accountForm.invalid){
              alert('popunite formu');
              console.log('email:',this.accountForm.get('email')?.valid)
              console.log('name:',this.accountForm.get('name')?.valid)
              return;
            }
            let dto: UserDTO | null = null;
              dto = {
                email: this.accountForm.get('email')?.value,
                firstName: this.accountForm.get('name')?.value,
                lastname: this.accountForm.get('surname')?.value,
                phoneNumber: this.accountForm.get('phone')?.value,
                address: this.accountForm.get('address')?.value,
              }
              console.log(dto);
              this.userData.editUser(dto).subscribe({
                next: result => {
                  // this.snackBar.open('check email, '+ result.name, undefined, {
                  //   duration: 2000,
                  // });
                  // alert('check email, '+ result.name);
                  alert("jej");
                  console.log(result);
                  // this.accountForm.reset();
                },
                error: e =>
                  {console.log(e?.error?.message);
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
    const address = control.get('address');
    const isAddressEmpty = address?.value != undefined && address?.value != null && address?.value != "";
   
    if (isValidEmail && isValidName && isValidSurname && isPhoneValid && isAddressEmpty) {
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

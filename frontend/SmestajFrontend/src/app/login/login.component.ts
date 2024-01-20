import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { UserdataService } from '../services/userdata.service';
import { AuthenticationRequestDTO } from '../dtos/LoginDtos';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isDisabled: boolean = true;

  constructor(private jwtService: JwtService, private router:Router, private userService: UserdataService) { 
    this.check = this.check.bind(this);
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required)},
      { validators: this.check },
    );
  }

  login(){

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const body: AuthenticationRequestDTO = {
      email: email,
      password: password
    }
    this.userService.login(body).subscribe({
      next: result => {
        console.log(result);
        this.jwtService.setAccessToken(result.token);
        this.router.navigate(['/account'])
      },
      error: error => {
        if (error?.error?.message != undefined) {
          alert(error?.error?.message);
        }
        
      }
    })

  }

  check(control: AbstractControl) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\s]).{8,}$/;
    const password = control.get('password');
    const isValidPassword = true; //passwordRegex.test(password?.value);
    const cmail = control.get('email');
    const isValidEmail = emailRegex.test(cmail?.value);
    if (isValidEmail && isValidPassword) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
    const errors: { [key: string]: any } = {};
    if (!isValidEmail) {
      errors['validEmail'] = true;
    }
    // if (!isValidPassword) {
    //   errors['validPassword'] = true;
    // }
    return Object.keys(errors).length > 0 ? errors : null;
    
  }
}


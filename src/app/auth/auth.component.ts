import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent {

  email: string;
  password: string;
  mode: boolean = false;
  npassword: string;
  signUpForm: FormGroup;
  LoginForm: FormGroup;
  isPassVisivble = false;
  emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // loginstatus = false;
  // passwordMatchValidator: any;

  constructor(
    private formbuilder: FormBuilder,
    public router: Router,
    private appservice: AppService,
    private messageService:MessageService
  ) { }

  ngOnInit() {
    this.LoginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
    this.signUpForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      NewPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      ConPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    }, {
      validator: this.passwordMatchValidator
    });


    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.mode = params['mode'];
    // });
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['NewPassword'].value === frm.controls['ConPassword'].value
      ? null : { 'passwordMismatch': true };
  }

  onSubmit() {
    if (!this.mode) {
      this.onLogin();
    } else {
      this.onSignUp();
    }
  }

  onLogin() {
    if (this.LoginForm.invalid) {
      return false;
    }

    const payload = {
      username: this.LoginForm.value.email,
      password: this.LoginForm.value.password
    };

    this.appservice.loginUser(payload).subscribe({
      next: (response: any) => {
        console.log('Login Response', response);

        if (response?.success) {
          // sessionStorage.setItem('login', 'true')
          sessionStorage.setItem('access_token', response.accessToken);
          sessionStorage.setItem('email', response.data.email);
          sessionStorage.setItem('role', response.data.role);

          this.signUpForm.reset();
          this.LoginForm.reset();
          this.appservice.changeVariable(true);
          // this.checkstatus();
          this.router.navigate(['/users']);
          console.log("Login Submitted");
          this.messageService.add({ severity:'Success', summary: 'Success', detail: 'Hi How are doing today!!!' });
        } else {
          console.log('Login Error');
          this.messageService.add({ severity:'error', summary: 'Error', detail: `${response.message}` });
        }
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
    // console.log(this.appservice.loginstatus);
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      return false;
    }

    const payload = {
      username: this.signUpForm.value.email,
      password: this.signUpForm.value.NewPassword,
      confpassword: this.signUpForm.value.ConPassword
    };

    this.appservice.singUpUser(payload).subscribe({
      next: (response: any) => {
        console.log('Singup Response', response);

        if (response?.success) {
          // sessionStorage.setItem('login', 'true')
          sessionStorage.setItem('access_token', response.accessToken);
          sessionStorage.setItem('email', response.data.email);
          sessionStorage.setItem('role', response.data.role);

          this.signUpForm.reset();
          this.LoginForm.reset();
          this.appservice.changeVariable(true);
          // this.checkstatus();
          this.router.navigate(['/users']);
          console.log("Sign Up Form Submitted");
          this.messageService.add({ severity:'Success', summary: 'Success', detail: 'Hi How are doing today!!!' });
        } else {
          console.log('Login Error');
          this.messageService.add({ severity:'error', summary: 'Error', detail: 'Signup Failed!!!' });
        }
      }, error: (error: any) => {
        console.log('Error', error);
      }
    })
    // console.log(this.appservice.loginstatus);
  }


  checkstatus() {
    if (sessionStorage.getItem('login') == 'true') {
      this.appservice.changeVariable(true);
      // this.appservice.loginstatus = true;
      // console.log(this.appservice.changeVariable.);
    } else {
      this.appservice.changeVariable(false);
    }
  }
  switchMode() {
    this.mode = !this.mode;
    // sessionStorage.setItem('login', 'false')
  }

  spaceValidation(event: any) {
    if (event.target.value.charCodeAt() === 32) {
      return false;
    }
    return event;
  }
  openPass() {
    this.isPassVisivble = !this.isPassVisivble;
  }
}

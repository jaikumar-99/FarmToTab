import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

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
    private appservice: AppService
  ) {}

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
           ? null : {'passwordMismatch': true};
  }
  

  onSubmit() {
    console.log("Sign Up Form Submitted");
    sessionStorage.setItem('login','true')
    this.signUpForm.reset();
    this.LoginForm.reset();
    this.checkstatus();
    // console.log(this.appservice.loginstatus);
    this.router.navigate(['/users']);
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
    sessionStorage.setItem('login','false')
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

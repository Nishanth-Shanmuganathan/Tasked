import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from 'src/app/models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  signupForm: FormGroup;
  passwordMatch = false;

  helperStatus = 'pristine';
  helperServerError: string;
  helperPasswordVisible = false;
  helperConfirmPasswordVisible = false;

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]{1,}')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      advertise: new FormControl(false)
    });
  }

  checkMatch() {
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.signupForm.get('confirmPassword').setErrors({ invalid: true });
    }
  }

  onSubmit() {
    this.helperStatus = 'loading';
    const regCredentials: Auth = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email.toLowerCase(),
      password: this.signupForm.value.password,
      confirmPassword: this.signupForm.value.confirmPassword
    };

    this.authService.registerUser(regCredentials)
      .subscribe(res => {
        this.helperStatus = 'pristine';
        localStorage.setItem('new-user', 'true');
        if (res.token) {
          this.route.navigate(['']);
        }
      }, err => {
        this.helperStatus = 'pristine';
        this.helperServerError = this.authService.errorHandler(err);
      });
  }

}


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Auth } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  signinForm: FormGroup;

  helperStatus = 'pristine';
  helperPasswordVisible = false;
  helperServerError: string;

  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
    });
  }

  onSubmit() {
    this.helperStatus = 'loading';
    const a = "asdnsj".toLowerCase()
    if (this.signinForm.invalid) {
      return;
    }
    const loginCredentials: Auth = {
      email: this.signinForm.value.email.toLowerCase(),
      password: this.signinForm.value.password,
    }
    this.authService.loginUser(loginCredentials)
      .subscribe(res => {
        this.helperStatus = 'pristine';
        if (res.token) {
          this.route.navigate(['']);
        }
      }, err => {
        this.helperStatus = 'pristine';
        this.helperServerError = this.authService.errorHandler(err);
      });
  }
}

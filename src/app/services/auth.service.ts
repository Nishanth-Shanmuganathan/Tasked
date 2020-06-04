import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Auth } from './../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  username: string;
  email: string;
  id: string;
  authSubject = new Subject<string[]>();

  constructor(
    public http: HttpClient,
    private router: Router
  ) { }

  public registerUser(auth: Auth) {

    return this.http.post<{ message: string, token: string, data: { username: string, email: string, _id: string } }>
      ('http://localhost:3000/auth/register', auth)
      .pipe(tap(res => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('id', res.data._id);
        this.authSubject.next([this.token, this.username, this.email, this.id]);
      }));
  }

  public loginUser(auth: Auth) {
    return this.http.post<{ message: string, token: string, data: { email: string, username: string, _id: string } }>
      ('http://localhost:3000/auth/login', auth)
      .pipe(tap(res => {
        this.token = res.token;
        this.username = res.data.username;
        this.email = res.data.email;
        this.id = res.data._id;
        localStorage.setItem('token', this.token);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('id', res.data._id);
        this.authSubject.next([this.token, this.username, this.email, this.id]);
      }));
  }

  public isLoggedIn(): boolean {
    this.getToken();
    return !!this.email && !!this.username && !!this.token && !!this.id;
  }

  public getToken() {
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.id = localStorage.getItem('id');
    this.authSubject.next([this.token, this.username, this.email, this.id]);
  }

  public logout() {
    this.token = null;
    this.username = null;
    this.email = null;
    this.id = null;
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.authSubject.next([this.token, this.username, this.email, this.id]);
    if (!this.token) {
      this.router.navigate(['/auth']);
    }
  }

  public errorHandler(err) {
    if (err.error.message === 'AUTHENTICATION_DENIED') {
      return 'Email Id or Password incorrect...';
    } else if (err.error.message === 'PASSWORD_MISMATCH') {
      return 'Passwords mismatch...';
    } else if (err.error.message === 'EMAIL_ALREADY_EXISTS') {
      return 'Email Id already exists...';
    } else if (err.error.message === 'ERROR_IN_FETCHING_DATA') {
      return 'Error loading resource..';
    } else if (err.status === 500) {
      return 'Oops..Something wrong with servers...';
    } else {
      return 'An unknown error occurred...'
    }

  }
}

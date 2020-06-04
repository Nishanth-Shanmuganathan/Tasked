import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Task-Management';
  loggedIn = false;
  constructor(
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
    this.authService.authSubject.subscribe(res => {
      this.loggedIn = !!res[0];
    })
  }
}

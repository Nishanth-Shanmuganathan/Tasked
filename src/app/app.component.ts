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
  openSideBar: boolean;
  mobileView: boolean;
  constructor(
    private authService: AuthService
  ) { }
  ngOnInit() {
    this.loggedIn = this.authService.isLoggedIn();
    this.authService.authSubject.subscribe(res => {
      this.loggedIn = !!res[0];
    });
    if (screen.width >= 600) {
      this.openSideBar = true;
      this.mobileView = false;
    } else {
      this.openSideBar = false;
      this.mobileView = true;
    }
  }

  toggleSideBar(val) {
    this.openSideBar = val;
  }
}

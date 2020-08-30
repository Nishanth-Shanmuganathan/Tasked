import { AuthService } from './../services/auth.service';
import { ContactComponent } from './../dialogs/contact/contact.component';
import { SettingsComponent } from './../dialogs/settings/settings.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProfileComponent } from './../dialogs/profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() openSidebar = new EventEmitter<boolean>();
  sidebarOpen = false;
  loggedIn = false;
  username: string;
  constructor(
    private matDialog: MatDialog,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loggedIn = this.authService.isLoggedIn();
    this.authService.authSubject.subscribe(res => {
      this.loggedIn = !!res[0];
      this.username = res[1];
    });
  }
  openSideBar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.openSidebar.emit(this.sidebarOpen);
  }
  openProfileDialog() {
    this.matDialog.open(ProfileComponent, { disableClose: true });
  }

  openSettingsDialog() {
    this.matDialog.open(SettingsComponent, { disableClose: true });
  }

  openContactDialog() {
    this.matDialog.open(ContactComponent, { disableClose: true });
  }

  logout() {
    this.authService.logout();
  }
}

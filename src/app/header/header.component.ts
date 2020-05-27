import { ContactComponent } from './../dialogs/contact/contact.component';
import { SettingsComponent } from './../dialogs/settings/settings.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ProfileComponent } from './../dialogs/profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openProfileDialog() {
    this.matDialog.open(ProfileComponent);
  }

  openSettingsDialog() {
    this.matDialog.open(SettingsComponent);
  }

  openContactDialog() {
    this.matDialog.open(ContactComponent);
  }
}

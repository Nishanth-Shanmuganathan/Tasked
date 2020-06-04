import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { Settings } from './../../models/settings.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  notify;
  hours = 0;
  minutes = 0;
  seconds = 0;
  advertise = false;

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  helperFnCloseModal() {
    this.dialog.closeAll();
  }

  saveSettings() {
    const settings: Settings = {
      notifications: this.notify,
      advertise: this.advertise,
      hours: this.hours,
      minutes: this.minutes,
      seconds: this.seconds
    };
    this.taskService.addSettings(settings, this.authService.email);
  }

  changeTheme(color: string) {
    this.snackBar.open('Apologies... This functionality is not yet implemented...', '', { duration: 2000 })
  }
}

import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  value = 0;
  username: string;
  email: string;
  details: { total: number, active: number, completed: number, dead: number };

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.details = this.taskService.getTaskDetails();
    this.helperFnCalculateValue();
    this.username = this.authService.username;
    this.email = this.authService.email;
  }

  helperFnCalculateValue() {
    const success = this.details.completed / this.details.total;
    const failed = this.details.dead / this.details.total;
    const active = this.details.active / this.details.total * 0.1;
    this.value = (success + active - failed) * 100;
  }

  helperFnCloseModal() {
    this.dialog.closeAll();
  }

}

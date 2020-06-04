import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  issues: string[] = [];
  comments: string;

  helperToggle = false;

  constructor(
    private dialog: MatDialog,
    private taskService: TaskService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  helperFnCloseModal() {
    this.dialog.closeAll();
  }

  addComments() {
    const comment = { comment: this.comments, issues: this.issues };
    const userDetails = { username: this.authService.username, email: this.authService.email };
    this.taskService.addComments(comment, userDetails);
  }
}

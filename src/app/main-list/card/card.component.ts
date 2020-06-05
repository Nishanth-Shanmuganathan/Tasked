import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from './../../services/task.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() task: Task;

  hrsLeft: number;
  interval;
  value = 0;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const deadline = new Date(this.task.deadline).getTime();
    const createdDate = new Date(this.task.createdAt).getTime();
    this.timeCalculation(createdDate, deadline);

    this.interval = setInterval(() => {
      if (this.task.status === 'active') {
        this.timeCalculation(createdDate, deadline);
      }
    }, 3000);


  }

  timeCalculation(createdDate, deadline) {
    this.value = (Math.abs(Date.now() - createdDate) / Math.abs(deadline - createdDate) * 100);
    if (this.value >= 100 && (this.task.status !== 'dead' && this.task.status !== 'completed')) {
      // Percentage  greater than 100 'll be changed to dead
      this.value = 100;
      this.taskService.updateTasks(this.task.id, 'dead');
    }
  }

  updateCompletedStatus(id: string) {
    const snackBarRef = this.snackBar.open('Do this task got completed?',
      'Completed',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackBar', 'snack-complete'],
      });
    snackBarRef.afterDismissed().subscribe(info => {
      if (info.dismissedByAction === true) {
        this.taskService.updateTasks(id, 'completed');
      }
    });
  }

  deleteTask(id: string) {
    const snackBarRef = this.snackBar.open('Are you sure want to delete this task permanently?',
      'Confirm..',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackBar', 'snack-delete']
      });
    snackBarRef.afterDismissed().subscribe(info => {
      if (info.dismissedByAction === true) {
        this.taskService.deleteTasks(id);
      }
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}

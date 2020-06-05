import { GuideComponent } from './../dialogs/guide/guide.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { Task } from './../models/task.model';
import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.css']
})
export class MainListComponent implements OnInit {

  tasks: Task[];
  activeTasks: Task[];
  deadTasks: Task[];
  completedTasks: Task[];
  empty = false;
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('new-user')) {
      this.dialog.open(GuideComponent, { disableClose: true });
    }
    this.tasks = this.taskService.getTasks();
    this.activeTasks = this.tasks.filter(task => task.status === 'active');
    this.deadTasks = this.tasks.filter(task => task.status === 'dead');
    this.completedTasks = this.tasks.filter(task => task.status === 'completed');
    this.taskService.tasksAltered
      .subscribe(res => {
        this.tasks = res;
        this.empty = this.tasks.length === 0;
        this.activeTasks = this.tasks.filter(task => task.status === 'active');
        this.deadTasks = this.tasks.filter(task => task.status === 'dead');
        this.completedTasks = this.tasks.filter(task => task.status === 'completed');
      })
  }


}

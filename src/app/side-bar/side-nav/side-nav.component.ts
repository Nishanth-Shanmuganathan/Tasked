import { TaskService } from 'src/app/services/task.service';
import { AddTaskComponent } from './../../dialogs/add-task/add-task.component';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Search } from 'src/app/models/search.model';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  helpShowAddButtons = new Subject<void>();
  selected = 'dashboard';
  constructor(
    private matDialog: MatDialog,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
  }

  changingTaskView(days: number) {
    this.taskService.search(new Search(
      '',
      new Date(),
      new Date(new Date().getTime() + (days * 86400000)),
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ), 'sideBar');
  }

  fetchTasks() {
    this.taskService.getTasks();
  }

  openAddDialog() {
    this.matDialog.open(AddTaskComponent, { disableClose: true });
  }
}

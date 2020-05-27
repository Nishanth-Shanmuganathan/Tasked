import { AddTaskComponent } from './../../dialogs/add-task/add-task.component';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  helpShowAddButtons = new Subject<void>();

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }


  openAddDialog() {
    this.matDialog.open(AddTaskComponent)
  }
}

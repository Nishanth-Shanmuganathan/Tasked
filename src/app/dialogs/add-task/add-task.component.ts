import { AuthService } from './../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addTask: FormGroup;

  today = new Date(new Date().getTime() + 86400000);

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.addTask = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]{1,25}')]),
      description: new FormControl(null, [Validators.required]),
      deadline: new FormControl(null, [Validators.required]),
      createdAt: new FormControl(null),
      priority: new FormControl(null, [Validators.required]),
      label: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    this.addTask.patchValue({ createdAt: this.today });
    if (this.addTask.invalid) { return; }
    const task = new Task(
      null,
      this.addTask.value.title,
      this.addTask.value.description,
      'active',
      this.addTask.value.label,
      this.addTask.value.priority,
      this.addTask.value.deadline,
      new Date(),
    );
    this.taskService.addTasks(task, this.authService.id).subscribe(
      res => {
        this.addTask.reset();
        this.dialog.closeAll();
      },
      err => {
      }
    )
  }


  helperFnCloseModal() {
    this.dialog.closeAll();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addTask: FormGroup;

  today = new Date();

  constructor() { }

  ngOnInit(): void {
    this.addTask = new FormGroup({
      title: new FormControl(null, [Validators.required]),
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
    console.log(this.addTask.value);
  }

}

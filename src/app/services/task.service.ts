import { AuthService } from 'src/app/services/auth.service';
import { Settings } from './../models/settings.model';
import { MatDialog } from '@angular/material/dialog';
import { Search } from './../models/search.model';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];

  tasksAltered = new Subject<Task[]>();

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  getTasks() {
    this.fetchTasks();
    return this.tasks.slice();
  }

  getTaskDetails() {
    const total = this.tasks.length;
    let active = 0;
    let completed = 0;
    let dead = 0;
    this.tasks.forEach(task => {
      if (task.status === 'active') {
        active++;
      } else if (task.status === 'completed') {
        completed++;
      } else if (task.status === 'dead') {
        dead++;
      }
    });
    return { total, active, completed, dead };
  }

  search(search: Search, from?: string) {

    this.tasksAltered.next(this.getSearchResults(search, from));
  }


  fetchTasks() {
    this.http.get<{ message: string, data: any[] }>(environment.SERVER + 'fetch/' + this.authService.id)
      .pipe(map(res => {
        return res.data.map(ele => ({ ...ele, id: ele._id }));
      }))
      .subscribe(res => {
        this.tasks = res;
        this.tasksAltered.next(this.tasks);
      },
        err => {
        });
  }

  addTasks(task: Task, id: string): Observable<any> {
    return this.http.post<{ message: string, data: {} }>(environment.SERVER + 'add', { task, id })
      .pipe(tap(task => {
        const alteredTask: Task = { ...task.data, id: task.data._id };
        this.tasks.push(alteredTask);
        this.tasksAltered.next(this.tasks);
      }));
  }

  addComments(
    comments: { comment: string, issues: string[] },
    userDetails: { username: string, email: string }
  ) {
    this.http.post<{ message: string, data: { comment: string, issues?: string[] } }>
      (environment.SERVER + 'add-comment', { comments, userDetails })
      .subscribe(res => {
        this.dialog.closeAll();
      },
        err => {
        });
  }

  addSettings(settings: Settings, email: string) {
    this.http.post(environment.SERVER + '/settings', { settings, email })
      .subscribe(res => {
        this.dialog.closeAll();
      },
        err => {
        });
  }

  deleteTasks(id: string) {
    const index = this.tasks.findIndex(task => task.id === id);
    this.tasks.splice(index, 1);
    this.http.delete(environment.SERVER + 'delete/' + this.authService.id + '/' + id)
      .subscribe(res => {
        this.tasksAltered.next(this.tasks);
      },
        err => {
        });
  }

  updateTasks(id: string, status: string) {
    this.tasks.map(task => task.status = task.id === id ? status : task.status);
    const body = { userId: this.authService.id, id, status };
    this.http.patch(environment.SERVER + 'update', body)
      .subscribe(res => {
        this.tasksAltered.next(this.tasks);
      },
        err => {
        });
  }

  private getSearchResults(search: Search, from: string): Task[] {
    // There is no specific logic for displaying the snack bar
    // If the search is made at search bar and without search string it ll show up
    if (!search.searchString && !from) {
      this.snackBar.open('There is nothing wrong but if you feel like the filter is not working please make sure your search credentials are correct...', '', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }

    let filtered = search.searchString
      ? this.tasks.filter(task => task.title.toLowerCase().includes(search.searchString.toLowerCase()))
      : this.tasks;

    filtered = filtered.filter(task =>
      !search.filterDeadlineFrom || new Date(task.deadline).getTime() >= search.filterDeadlineFrom.getTime());

    filtered = filtered.filter(task =>
      !search.filterDeadlineTo || new Date(task.deadline).getTime() <= search.filterDeadlineTo.getTime());


    const top = filtered.filter(task => search.filterPriorityTop && task.priority === 'top');
    const moderate = filtered.filter(task => search.filterPriorityModerate && task.priority === 'moderate');
    const least = filtered.filter(task => search.filterPriorityLeast && task.priority === 'least');

    const priorityArray = [...top, ...moderate, ...least];

    if (priorityArray.length !== 0
      && (search.filterLabelOthers || search.filterLabelPersonal || search.filterLabelPersonal || search.filterLabelWork)) {
      filtered = this.labelFilter(search, priorityArray);
    } else if (search.filterLabelOthers || search.filterLabelPersonal || search.filterLabelPersonal || search.filterLabelWork) {
      filtered = this.labelFilter(search, filtered);
    } else if (priorityArray.length !== 0) {
      filtered = priorityArray;
    }



    filtered = search.sortDeadline ? this.sortDeadline(filtered) : filtered;

    filtered = search.sortPriority ? this.sortPriority(filtered) : filtered;

    filtered = search.sortLabel ? this.sortLabel(filtered) : filtered;

    return filtered;
  }

  private sortLabel(arr: Task[]) {
    const personal = arr.filter(task => task.label === 'personal');
    const work = arr.filter(task => task.label === 'work');
    const shopping = arr.filter(task => task.label === 'shopping');
    const others = arr.filter(task => task.label === 'others');
    return [...personal, ...work, ...shopping, ...others];
  }


  private sortPriority(arr: Task[]) {
    const top = arr.filter(task => task.priority === 'top');
    const moderate = arr.filter(task => task.priority === 'moderate');
    const least = arr.filter(task => task.priority === 'least');
    return [...top, ...moderate, ...least];
  }


  private sortDeadline(arr: Task[]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (new Date(arr[i].deadline).getTime() < new Date(arr[j].deadline).getTime()) {
          const temp = arr[j];
          arr[j] = arr[i];
          arr[i] = temp;
        }
      }
    }
    return arr;
  }


  private labelFilter(search: Search, arr: any[]) {
    const personal = arr.filter(task => search.filterLabelPersonal && task.label === 'personal');
    const work = arr.filter(task => search.filterLabelWork && task.label === 'work');
    const shopping = arr.filter(task => search.filterLabelShopping && task.label === 'shopping');
    const others = arr.filter(task => search.filterLabelOthers && task.label === 'others');
    return [...personal, ...work, ...shopping, ...others];
  }
}


import { TaskService } from 'src/app/services/task.service';
import { Search } from './../../models/search.model';
import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, DoCheck {

  search: string;

  filterDeadlineFrom: Date;
  filterDeadlineTo: Date;
  filterPriority: string[];
  filterLabel: string[];

  sortCredentials: string[];

  @ViewChild('topPriority') topPriority: ElementRef;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
  }
  stopPropagation(event) {
    event.stopPropagation();
  }

  resetSearchCredentials() {
    this.search = null;
    this.filterDeadlineFrom = null;
    this.filterDeadlineTo = null;
    this.filterPriority = null;
    this.filterLabel = null;
    this.sortCredentials = null;
    this.searchTasks();
  }

  searchTasks() {
    const searchString = this.search ? this.search : '';
    const filterDeadlineFrom = this.filterDeadlineFrom ? this.filterDeadlineFrom : null;
    const filterDeadlineTo = this.filterDeadlineTo ? this.filterDeadlineTo : null;

    const filterPriorityTop = this.filterPriority?.indexOf('top') + 1 ? true : false;
    const filterPriorityModerate = this.filterPriority?.indexOf('moderate') + 1 ? true : false;
    const filterPriorityLeast = this.filterPriority?.indexOf('least') + 1 ? true : false;

    const filterLabelPersonal = this.filterLabel?.indexOf('personal') + 1 ? true : false;
    const filterLabelWork = this.filterLabel?.indexOf('work') + 1 ? true : false;
    const filterLabelShopping = this.filterLabel?.indexOf('shopping') + 1 ? true : false;
    const filterLabelOthers = this.filterLabel?.indexOf('others') + 1 ? true : false;

    const sortDeadline = this.sortCredentials?.indexOf('deadline') + 1 ? true : false;
    const sortPriority = this.sortCredentials?.indexOf('priority') + 1 ? true : false;
    const sortLabel = this.sortCredentials?.indexOf('label') + 1 ? true : false;

    const searchCredentials = new Search(
      searchString,
      filterDeadlineFrom,
      filterDeadlineTo,
      filterPriorityTop,
      filterPriorityModerate,
      filterPriorityLeast,
      filterLabelPersonal,
      filterLabelWork,
      filterLabelShopping,
      filterLabelOthers,
      sortDeadline,
      sortPriority,
      sortLabel
    );
    this.taskService.search(searchCredentials);
  }

}

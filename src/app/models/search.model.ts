export class Search {
  constructor(
    public searchString: string,
    public filterDeadlineFrom: Date,
    public filterDeadlineTo: Date,
    public filterPriorityTop: boolean,
    public filterPriorityModerate: boolean,
    public filterPriorityLeast: boolean,
    public filterLabelPersonal: boolean,
    public filterLabelWork: boolean,
    public filterLabelShopping: boolean,
    public filterLabelOthers: boolean,
    public sortDeadline: boolean,
    public sortPriority: boolean,
    public sortLabel: boolean
  ) { }
}

export class Search {
  constructor(
    public searchString: string = '',
    public filterDeadlineFrom: Date = null,
    public filterDeadlineTo: Date = null,
    public filterPriorityTop: boolean = false,
    public filterPriorityModerate: boolean = false,
    public filterPriorityLeast: boolean = false,
    public filterLabelPersonal: boolean = false,
    public filterLabelWork: boolean = false,
    public filterLabelShopping: boolean = false,
    public filterLabelOthers: boolean = false,
    public sortDeadline: boolean = false,
    public sortPriority: boolean = false,
    public sortLabel: boolean = false
  ) { }
}

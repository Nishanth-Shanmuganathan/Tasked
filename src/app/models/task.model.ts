export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: string,
    public label: string,
    public priority: string,
    public deadline: Date,
    public createdAt: Date
  ) { }
}

export class Settings {
  constructor(
    public notifications: string[],
    public advertise: boolean = false,
    public hours: number = 0,
    public minutes: number = 0,
    public seconds: number = 0
  ) { }
}

export class Auth {
  constructor(
    public email: string,
    public password: string,
    public username?: string,
    public confirmPassword?: string,
  ) { }
}

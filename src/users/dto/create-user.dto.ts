import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

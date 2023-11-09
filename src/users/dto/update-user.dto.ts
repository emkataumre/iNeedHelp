import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  constructor(_id: string, username: string, email: string) {
    super(username, email);
    this._id = _id;
  }
  _id: string;
}

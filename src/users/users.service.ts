import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import mongoose, { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    const users = await this.userModel.find().exec();
    return users;
  }
  async findOne(_id: string) {
    const user = await this.userModel.findById(_id).exec();
    console.log(_id);
    console.log(user);
    return user;
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(_id, updateUserDto)
      .exec();
    return user;
  }

  async remove(_id: string) {
    const user = await this.userModel.findByIdAndDelete(_id).exec();
    if (await this.userModel.findById(_id)) {
      console.log('Delete failed');
      console.log(user);
      return user;
    } else {
      return 'Delete successful';
    }
  }

  async removeAll() {
    this.userModel.deleteMany({});
  }
}

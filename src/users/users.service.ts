import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.create.dto';
import { User, UserDocument } from './schemas/user.schema';

type UserDocumentPromise = Promise<UserDocument>;

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): UserDocumentPromise {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async getAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find({}).exec();
  }
}

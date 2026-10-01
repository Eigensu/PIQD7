import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

export interface GoogleProfile {
  googleId: string;
  email: string;
  name?: string;
  picture?: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly users: Model<User>) {}

  // First Google sign-in creates the account; later sign-ins refresh the
  // profile fields Google owns (name, picture, email).
  upsertFromGoogle(profile: GoogleProfile): Promise<UserDocument> {
    const { googleId, ...fields } = profile;
    return this.users
      .findOneAndUpdate(
        { googleId },
        { $set: fields, $setOnInsert: { googleId } },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      )
      .exec();
  }

  findById(id: string): Promise<UserDocument | null> {
    return this.users.findById(id).exec();
  }
}

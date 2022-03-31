import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {BaseRepository} from 'src/base/base.repository';
import {IUserModel} from './user.interface';
import {UserModel} from './user.schema';

@Injectable()
export class UserRepository extends BaseRepository<IUserModel> {
    constructor(@InjectModel(UserModel) model) {
        super(model);
    }
}

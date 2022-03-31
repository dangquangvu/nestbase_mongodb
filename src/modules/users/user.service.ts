import {Injectable, NotFoundException} from '@nestjs/common';
import {IPagination} from 'src/adapter/pagination/pagination.interface';
import {ErrorMessages} from 'src/shared/errors/error';
import {addMongooseParam, db2api, getHeaders} from 'src/shared/helper';
import {FilterUserDto} from './dto/filter-user.dto';
import {LoginUserDto} from '../auth/dto/login-user.dto';
import {ICreateUser, IUser} from './user.interface';
import {UserRepository} from './user.repository';
import * as bcrypt from 'bcrypt';
import {CreateUserDto} from '../auth/dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private readonly repo: UserRepository) {}

    async indexs(
        filters: FilterUserDto,
        pagination: IPagination,
    ): Promise<{items: IUser[]; headers: any}> {
        const findParams = this.getFilterParam(filters);
        const count = await this.repo.count(findParams);
        const responseHeaders = getHeaders(pagination, count);
        const lists = await this.repo.findAll(
            findParams,
            pagination.startIndex,
            pagination.perPage,
        );

        return {
            items: db2api(lists, ['password']),
            headers: responseHeaders,
        };
    }

    async findByEmail(email: string): Promise<IUser> {
        const user = this.repo.findOne({email: email});
        return user;
    }

    async detail(id: string): Promise<IUser> {
        const item: IUser = await this.repo.findById(id);

        if (!item) {
            throw new NotFoundException(ErrorMessages.user_is_not_found);
        }
        return db2api(item, ['password']);
    }

    async register(input: CreateUserDto): Promise<IUser> {
        const {email, fullName, password} = input;

        const newUser: ICreateUser = {
            email,
            fullName,
            password,
        };

        const item = await this.repo.create(newUser);
        return db2api(item, ['password']);
    }

    // async login(input: LoginUserDto): Promise<any> {
    //     const {email, password} = input;

    //     const user: IUser = await this.findByEmail(email);
    //     if (!user) {
    //         throw new NotFoundException('Password or email not match, please try again!');
    //     }
    //     await this.checkPassword(password, user.password);
    //     const payload = {email: user.email, id: user._id};

    //     return {
    //         fullName: user.fullName,
    //         email: user.email,
    //         accessToken: this.authService.generateJwtToken(payload),
    //     };
    // }

    getFilterParam(filters: FilterUserDto) {
        const findParams: any = {};

        if (filters.email) {
            findParams.email = addMongooseParam(
                findParams.email,
                '$regex',
                new RegExp(filters.email, 'i'),
            );
        }

        if (filters.fullName) {
            findParams.fullName = addMongooseParam(
                findParams.fullName,
                '$regex',
                new RegExp(filters.fullName, 'i'),
            );
        }

        if (filters.role) {
            findParams.roles = filters.role;
        }

        if (filters.isActive) {
            findParams.isActive = filters.isActive;
        }

        return findParams;
    }
}

import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {LoggerService} from 'src/logger/custom.logger';
import {UserController} from './user.controller';
import {UserRepository} from './user.repository';
import {UserModel, UserSchema} from './user.schema';
import {UserService} from './user.service';

const dbSchemas = [{name: UserModel, schema: UserSchema}];

@Module({
    imports: [MongooseModule.forFeature(dbSchemas), ConfigModule],
    providers: [UserService, UserRepository, ConfigService, LoggerService, ConfigService],
    exports: [UserService, UserRepository],
    controllers: [UserController],
})
export class UserModule {}

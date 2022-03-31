import {Global, Module} from '@nestjs/common';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {MongooseModule} from '@nestjs/mongoose';
import {AuthModule} from 'src/modules/auth/auth.module';
import {AuthService} from 'src/modules/auth/auth.service';
import {UserModule} from 'src/modules/users/user.module';
import {UserRepository} from 'src/modules/users/user.repository';
import {UserModel, UserSchema} from 'src/modules/users/user.schema';
import {UserService} from 'src/modules/users/user.service';
import {PasswordConfirmValidator} from './password-confirm.validator';
import {UniqueEmailValidator} from './unique-email.validator';

const dbSchemas = [{name: UserModel, schema: UserSchema}];

@Global()
@Module({
    imports: [MongooseModule.forFeature(dbSchemas), AuthModule],
    providers: [PasswordConfirmValidator, UniqueEmailValidator, UserService, UserRepository],
    exports: [PasswordConfirmValidator, UniqueEmailValidator],
})
export class ValidatorModule {}

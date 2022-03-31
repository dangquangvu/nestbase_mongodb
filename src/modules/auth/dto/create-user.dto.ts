import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsEnum, IsNotEmpty, IsString, Length, Validate} from 'class-validator';
import {getStringEnumValues} from 'src/shared/helper';
import {PasswordConfirmValidator} from 'src/validators/password-confirm.validator';
import {UniqueEmailValidator} from 'src/validators/unique-email.validator';
import {UserRoleEnum} from '../../auth/auth.constant';

export class CreateUserDto {
    @ApiProperty({
        title: 'email',
        description: 'email',
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    @Validate(UniqueEmailValidator)
    email: string;

    @ApiProperty({
        title: 'fullName',
        description: 'fullName',
        type: String,
    })
    @IsNotEmpty()
    fullName: string;

    @ApiProperty({
        title: 'role',
        description: 'role',
        type: String,
    })
    @IsNotEmpty()
    @IsString()
    @IsEnum(getStringEnumValues(UserRoleEnum))
    role: string;

    @ApiProperty({
        title: 'password',
        description: 'password',
        type: String,
    })
    @IsNotEmpty()
    @Length(4, 24)
    password: string;

    @ApiProperty({
        title: 'password_confirmation',
        description: 'password_confirmation',
        type: String,
    })
    @IsNotEmpty()
    @Validate(PasswordConfirmValidator, ['password'])
    password_confirmation: string;
}

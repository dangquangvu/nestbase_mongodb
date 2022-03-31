import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, Length} from 'class-validator';

export class LoginUserDto {
    @ApiProperty({
        title: 'email',
        description: 'email',
        type: String,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        title: 'password',
        description: 'password',
        type: String,
    })
    @IsNotEmpty()
    @Length(4, 24)
    password: string;
}

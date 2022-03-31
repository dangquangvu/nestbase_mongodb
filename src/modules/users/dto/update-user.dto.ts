import {IsBoolean, IsNotEmpty, IsOptional, Length, Validate} from 'class-validator';
import {PasswordConfirmValidator} from 'src/validators/password-confirm.validator';

export class UpdateUserDto {
    @IsOptional()
    fullName: string;

    @IsOptional()
    @IsNotEmpty()
    @Length(8, 24)
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @Validate(PasswordConfirmValidator, ['password'])
    password_confirmation: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}

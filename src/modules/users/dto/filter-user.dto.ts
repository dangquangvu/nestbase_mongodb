import {ApiPropertyOptional} from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    Validate,
} from 'class-validator';
import {getStringEnumValues} from 'src/shared/helper';
import {UserRoleEnum} from '../../auth/auth.constant';

export class FilterUserDto {
    @ApiPropertyOptional({
        title: 'email',
        description: 'email',
        type: String,
    })
    @IsString()
    @IsOptional()
    email: string;

    @ApiPropertyOptional({
        title: 'fullName',
        description: 'full name',
        type: String,
    })
    @IsString()
    @IsOptional()
    fullName: string;

    @ApiPropertyOptional({
        title: 'role',
        description: 'role user',
        type: String,
    })
    @IsEnum(getStringEnumValues(UserRoleEnum))
    @IsOptional()
    role: string;

    @ApiPropertyOptional({
        title: 'isActive',
        description: 'is active',
        type: String,
    })
    @IsOptional()
    @IsBoolean()
    isActive: boolean;
}

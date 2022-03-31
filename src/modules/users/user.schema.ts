import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import {getStringEnumValues} from 'src/shared/helper';
import {UserRoleEnum} from '../auth/auth.constant';

const UserModel = 'User';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            minlength: 3,
            maxlength: 255,
            default: 'User',
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, 'EMAIL_IS_NOT_BLANK'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'PASSWORD_IS_NOT_BLANK'],
        },
        role: {
            type: String,
            enum: getStringEnumValues(UserRoleEnum),
            default: UserRoleEnum.User,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        versionKey: false,
        timestamps: true,
    },
);

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.index({email: 1}, {background: true});

export {UserSchema, UserModel};

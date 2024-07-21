import { model, Schema } from 'mongoose';
import email from 'mongoose-type-email';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: email,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
      timestamps: true,
      versionKey: false,
    },
);

// userSchema.methods.toJSON = function () {
//     const obj = this.toObject();
//     delete obj.password;
//     return obj;
// };

const User = model('users', userSchema);
export default User;

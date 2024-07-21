import { model, Schema } from 'mongoose';
import email from 'mongoose-type-email';

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: email,
            required: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            required: false,
            default: 'personal',
            enum: ['work', 'home', 'personal'],
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        }
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const Contact = model('contacts', contactSchema);
export default Contact;

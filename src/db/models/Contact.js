import { model, Schema } from 'mongoose';

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
            type: String,
            required: false,
        },
        isFavourite: {
            type: Boolean,
            default: false,
        },
        contactType: {
            type: String,
            required: true,
            default: 'personal',
            enum: ['work', 'home', 'personal'],
        },
        photo: {
            type: String,
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

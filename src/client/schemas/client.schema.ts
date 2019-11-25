import { Schema } from 'mongoose';

export const ClientSchema = new Schema({
    rut: { type: String, required: true },
    rut_chilen: { type: String, required: true },
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    sex: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: [String], required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
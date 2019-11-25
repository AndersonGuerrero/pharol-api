import { Document } from "mongoose";

export interface Client extends Document {
    readonly rut: string;
    readonly rut_chilen: string;
    readonly name: string;
    readonly last_name: string;
    readonly phone: string;
    readonly sex: string;
    readonly email: string;
    readonly address: Array<string>;
    readonly createdAt: Date;
}
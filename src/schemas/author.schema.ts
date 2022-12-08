import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from 'mongoose';
export type AuthorDocument = Author & Document;

@Schema({ timestamps: true })
export class Author {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    avatar: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    birth: string;

    @Prop({ required: true })
    death: string;

    @Prop({ required: true })
    wikipedia: string;

    @Prop()
    isVerified: boolean;

}

export const AuthorSchema = SchemaFactory.createForClass(Author);
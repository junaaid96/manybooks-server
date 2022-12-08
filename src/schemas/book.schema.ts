import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Author } from './author.schema';
import { History } from './history.schema';
import { User, UserSchema } from './user.schema';
export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
    @Prop({ required: true })
    name: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true })
    authorId: Author;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "History", required: true })
    // historyId: History;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    genre: string;

    @Prop({ required: true })
    file: string;

    @Prop({ required: true })
    cover: string;

    @Prop({ default: 'published' })
    status: string;

    @Prop()
    rejectReason: string;

    @Prop({ required: true })
    numberOfPages: string;

    @Prop({ required: true })
    language: string;

    @Prop()
    shares: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    userId: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
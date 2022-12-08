import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from './book.schema';
import { User } from './user.schema';
export type HistoryDocument = History & Document;

enum HistoryTypes {
    // like = "like",
    // dislike = "dislike",
    search = "search",
    read = "read",
    // share = "share",
}

@Schema({ timestamps: true })
export class History {
    @Prop({ required: true, enum: HistoryTypes })
    type: String;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true })
    bookId: Book;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    userId: User;
}

export const HistorySchema = SchemaFactory.createForClass(History);
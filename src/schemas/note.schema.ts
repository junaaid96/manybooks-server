import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from './book.schema';
export type NoteDocument = Note & Document;

@Schema({ timestamps: true })
export class Note {
    @Prop({ required: true })
    text: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true })
    bookId: Book;

    @Prop({ required: true})
    color: string;

    @Prop({required: true})
    type: string;

}

export const NoteSchema = SchemaFactory.createForClass(Note);
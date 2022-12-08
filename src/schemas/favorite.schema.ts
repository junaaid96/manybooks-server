import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from './book.schema';
import { User, UserSchema } from './user.schema';
export type FavoriteDocument = Favorite & Document;

@Schema({ timestamps: true })
export class Favorite {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true })
    // @Prop({required: true})
    bookId: Book; 

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    userId: User;

    // @Prop({required: true})
    // userId: string; 
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
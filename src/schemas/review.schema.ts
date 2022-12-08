import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Book } from "./book.schema";
import { User } from "./user.schema";
export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    userId: User;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true })
    bookId: Book;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

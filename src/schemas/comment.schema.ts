import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Story } from './story.schema';
import { User, UserSchema } from './user.schema';
export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
    @Prop({ required: true })
    text: string;

    @Prop({required: false })
    storyId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: false })
    userId: User;


}

export const CommentSchema = SchemaFactory.createForClass(Comment);
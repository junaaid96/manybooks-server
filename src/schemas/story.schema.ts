import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
export type StoryDocument = Story & Document;

@Schema({ timestamps: true })
export class Story {
    @Prop({ required: true })
    image: string;

    @Prop({ default: null })
    text: string;

    @Prop({ default: '0' })
    likes: string;

    @Prop()
    links: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    userId: User;


}

export const StorySchema = SchemaFactory.createForClass(Story);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User, UserSchema } from './user.schema';
export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: true })
export class Feedback {
    @Prop({ required: true })
    text: string;
    
    @Prop({ required: true })
    isResolved: boolean;

    @Prop({ required: true })
    image: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    userId: User;
    
    // @Prop({required: true})
    // userId: string; 

}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
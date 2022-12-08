import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedbackDocument } from 'src/schemas/feedback.schema';
import { CreateFeedbackDto, FeedbackQueryDto, UpdateFeedbackDto } from './dto/feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Injectable()
export class FeedbackService {
  constructor(@InjectModel(Feedback.name) private feedbackModel: Model<FeedbackDocument>) {}

  async create(body: CreateFeedbackDto, userid): Promise<Feedback> {
    body["userId"] = userid;
    return await new this.feedbackModel(body).save();
  }

  async seed() {
    for (var i = 0; i < 1000; i++) {
      await this.feedbackModel.create({
        userId: i+'',
        text: i+'',
        isResolved: true,
        image: i+''      
      })
    }

    return "Created"
  }

  async getFeedbacksSorted(query: FeedbackQueryDto) {
    return await this.feedbackModel.find({})
      .skip((query.page - 1) * query.limit)
      .limit(query.limit)
      .sort({
        createdAt: 1
      })
  }

  // findAll() {
  //   return `This action returns all feedback`;
  // }

  async findOne(id: string): Promise<Feedback> {
    return await this.feedbackModel.findById({ _id: id });
  }
  async update(id: string, body: UpdateFeedbackDto): Promise<Feedback> {
    return await this.feedbackModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
  }

  async remove(id: string) {
    return await this.feedbackModel.deleteOne({ _id: id });
  }

  async deleteMany() {
    return await this.feedbackModel.deleteMany({});
  }
}

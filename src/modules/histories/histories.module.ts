import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema, History } from 'src/schemas/history.schema';
import { ReviewsController } from '../reviews/reviews.controller';
import { ReviewsService } from '../reviews/reviews.service';
import { Review, ReviewSchema } from 'src/schemas/review.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: History.name, schema: HistorySchema }]), MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }])],
  controllers: [HistoriesController, ReviewsController],
  providers: [HistoriesService, ReviewsService]
})
export class HistoriesModule { }

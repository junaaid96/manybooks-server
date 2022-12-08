import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { BookSchema } from 'src/schemas/book.schema';
import { Book } from './entities/book.entity';
import { HistorySchema, History } from 'src/schemas/history.schema';
import { HistoriesController } from '../histories/histories.controller';
import { HistoriesService } from '../histories/histories.service';
import { Review, ReviewSchema } from 'src/schemas/review.schema';
import { ReviewsController } from '../reviews/reviews.controller';
import { ReviewsService } from '../reviews/reviews.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }, { name: History.name, schema: HistorySchema }, { name: Review.name, schema: ReviewSchema }])],
    controllers: [BooksController, HistoriesController, ReviewsController],
    providers: [BooksService, HistoriesService, ReviewsService]
})
export class BooksModule { }

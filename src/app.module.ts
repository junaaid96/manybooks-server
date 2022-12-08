import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { CommentsModule } from './modules/comments/comments.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { HistoriesModule } from './modules/histories/histories.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { StoriesModule } from './modules/stories/stories.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.DATABASE_URL), UsersModule, BooksModule, CommentsModule, StoriesModule, HistoriesModule, FavoriteModule, FeedbackModule, ReviewsModule, AuthorsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

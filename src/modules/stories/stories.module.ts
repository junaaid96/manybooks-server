import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StorySchema } from 'src/schemas/story.schema';
import { Story } from './entities/story.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Story.name, schema: StorySchema }])],
  controllers: [StoriesController],
  providers: [StoriesService]
})
export class StoriesModule { }

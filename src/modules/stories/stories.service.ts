import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StoryDocument } from 'src/schemas/story.schema';
import { CreateStoryDto, QueryStoryDto, UpdateStoryDto } from './dto/story.dto';
import { Story } from './entities/story.entity';

@Injectable()
export class StoriesService {
  constructor(@InjectModel(Story.name) private storyModel: Model<StoryDocument>) { }
  async create(body: CreateStoryDto, userid): Promise<Story> {
    body["userId"] = userid;
    return await new this.storyModel(body).save();
  }

  async getStories(query: QueryStoryDto) {
    // var sortObj = {

    // }
    // sortObj[`${query.sortBy}`] = query.sortOrder;

    const limit = query.limit || 10;
    const page = query.page || 1;

    const data = await this.storyModel.find({}).limit(limit).skip((page - 1) * limit).sort(
      {
        createdAt: -1
      }
    ).populate("userId").exec();
    const total = await this.storyModel.count();
    return { "data": data, "total": total };
// const data = await this.storyModel.updateMany({image: faker.image.avatar()});

// return data;
  }

  async findOne(id: string): Promise<Story> {
    return await this.storyModel.findById({ _id: id });
  }

  async update(id: string, body: UpdateStoryDto): Promise<Story> {
    return await this.storyModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
  }

  async remove(id: string) {
    return await this.storyModel.deleteOne({ _id: id });
  }

  async deleteMany() {
    return await this.storyModel.deleteMany({});
  }

  async seeder() {
    for (let i = 0; i < 3; i++) {
      let body = {
        image: faker.image.avatar(),
        text: "" + i,
        likes: "" + i,
        userId: "631d952ceb4ec89a461030b4",
      };

      await new this.storyModel(body).save();
    }
  }
}

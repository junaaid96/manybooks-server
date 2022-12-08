import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FavoriteDocument } from 'src/schemas/favorite.schema';
import { CreateFavoriteDto, FavoriteQueryDto, UpdateFavoriteDto } from './dto/favorite.dto';
import { Favorite } from './entities/favorite.entity';


@Injectable()
export class FavoriteService {
  constructor(@InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>) {}

  async create(body: CreateFavoriteDto, userid): Promise<Favorite> {
    body["userId"] = userid;
    return await new this.favoriteModel(body).save();
  }

  async seed() {
    for (var i = 0; i < 1000; i++) {
      await this.favoriteModel.create({
        bookId: i+'',
        userId: i+''
      })
    }

    return "Created"
  }

  async sortedFavorite(query: FavoriteQueryDto) {
    return await this.favoriteModel.find({})
      .skip((query.page - 1) * query.limit)
      .limit(query.limit)
      .sort({
        createdAt: 1
      })
  }

  async findOne(id: string): Promise<Favorite> {
    return await this.favoriteModel.findById({ _id: id });
  }

  async update(id: string, body: UpdateFavoriteDto): Promise<Favorite> {
    return await this.favoriteModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
  }

  async remove(id: string) {
    return await this.favoriteModel.deleteOne({ _id: id });
  }

  async deleteMany() {
    return await this.favoriteModel.deleteMany({});
  }
}

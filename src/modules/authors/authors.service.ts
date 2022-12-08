import { Model } from "mongoose";
import { ObjectId } from "mongoose";
import { Injectable } from '@nestjs/common';
import { CreateAuthorDto, QueryAuthorDto, UpdateAuthorDto } from './dto/author.dto';
import { AuthorDocument } from "src/schemas/author.schema";
import { Author } from "./entities/author.entity";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<AuthorDocument>) { }

  async create(body: CreateAuthorDto,): Promise<Author> {
    return await new this.authorModel(body).save();
  }

  async seeder() {
    for (let i = 0; i < 100; i++) {
      let body = {
        name: "" + i,
        avatar: "" + i,
        description: "" + i,
        birth: "" + i,
        death: "" + i,
        wikipedia: "" + i,
        isVerified: "" + i,
      };

      await new this.authorModel(body).save();
    }
  }

  async findOne(id: string): Promise<Author> {
    return await this.authorModel.findById({ _id: id });
  }

  async update(id: string, body: UpdateAuthorDto): Promise<Author> {
    return await this.authorModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
  }

  async remove(id: string) {
    return await this.authorModel.deleteOne({ _id: id });
  }

  async deleteMany() {
    return await this.authorModel.deleteMany({});
  }

  async getAuthors(query: QueryAuthorDto) {
    var sortObj = {}
    sortObj[`${query.sortBy}`] = query.sortOrder;

    const limit = query.limit || 10;
    const page = query.page || 1;

    const data = await this.authorModel.find({}).limit(limit).skip((page - 1) * limit).sort(
      sortObj
    ).exec();
    const total = await this.authorModel.count();
    return { "data": data, "total": total };
  }
}
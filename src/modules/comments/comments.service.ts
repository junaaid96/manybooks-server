import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCommentDto, QueryCommentDto, UpdateCommentDto } from './dto/comments.dto';
import { Model } from "mongoose";
import { JwtService } from '@nestjs/jwt';
import { CommentDocument, Comment } from 'src/schemas/comment.schema';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>
        ) { }
    async create(body: CreateCommentDto, userid): Promise<Comment> {
        body["userId"] = userid;
        return await new this.commentModel(body).save();
    }

    async seeder() {
        for (let i = 0; i < 100; i++) {
            let body = {
                text: "" + i,
                // bookId: "" + i,
                userId: "62ea079d890f51f423ec9760",
                storyId: "" + i
            };

            await new this.commentModel(body).save();
        }

        return 1;
    }

    async findAll(query: QueryCommentDto) {
        var sortObj = {

        }
        sortObj[`${query.sortBy}`] = query.sortOrder;

        const limit = query.limit || 10;
        const page = query.page || 1;

        const data = await this.commentModel.find({}).limit(limit).skip((page - 1) * limit).sort(
            sortObj
        ).exec();
        const total = await this.commentModel.count();
        return { "data": data, "total": total };
    }

    async findOne(id: string): Promise<Comment> {
        return await this.commentModel.findById({ _id: id });
    }

    async update(id: string, body: UpdateCommentDto): Promise<Comment> {
        return await this.commentModel.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );
    }

    async remove(id: string) {
        return await this.commentModel.deleteOne({ _id: id });
    }

    async deleteMany() {
        return await this.commentModel.deleteMany({});
    }
}

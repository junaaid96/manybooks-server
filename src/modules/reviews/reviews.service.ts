import { Injectable } from "@nestjs/common";
import {
    CreateReviewDto,
    UpdateReviewDto,
    QueryReviewDto,
} from "./dto/review.dto";
import { Model } from "mongoose";
import { ObjectId } from "mongoose";
import { ReviewDocument } from "src/schemas/review.schema";
import { Review } from "./entities/review.entity";
import { InjectModel } from "@nestjs/mongoose";
import { faker } from '@faker-js/faker';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectModel(Review.name) private ReviewModel: Model<ReviewDocument>
    ) { }

    async create(body: CreateReviewDto, userId): Promise<Review> {
        body["userId"] = userId;
        return await new this.ReviewModel(body).save();
    }

    async seeder() {


        // Get users query 
        var usersArr = [
            "6301e9f243719de7e0637acf",
            "6305e36743719de7e063a6d4",
            "6305feac43719de7e063ac92",
            "6316fbb7093225981c37775d",
            "631d952ceb4ec89a461030b4",
            "6351217440ef5d60e653fc93",
            "635121db40ef5d60e653fc95",
            "6351223b40ef5d60e653fc98",
            "6351226b40ef5d60e653fc9a",
            "635122a840ef5d60e653fc9c",
            "635122ea40ef5d60e653fc9e",
            "6351232140ef5d60e653fca0",
            "6351237440ef5d60e653fca2",
            "6351239a40ef5d60e653fca3",
            "635123d940ef5d60e653fca5",
            "6351246540ef5d60e653fca7",
            "6351249940ef5d60e653fca8",
            "635124b540ef5d60e653fca9",
            "635124f740ef5d60e653fcab",
            "6351252540ef5d60e653fcac"
        ]
        var bookArr = [
            "6322db5464c70448ad0282d4",
            "6322db6c64c70448ad0282d6",
            "6322dbe564c70448ad0282d8",
            "6328216da80780140e998f5d",
            "6329824c1c67cc8eaf26fe26",
            "632982dd1c67cc8eaf26fe2a",
            "632983891c67cc8eaf26fe2e",
            "632983f41c67cc8eaf26fe32",
            "632984c21c67cc8eaf26fe36",
            "6329acd61c67cc8eaf26fe3a",
            "6329ad671c67cc8eaf26fe3e",
            "6329af1b1c67cc8eaf26fe42",
            "6329b1751c67cc8eaf26fe55",
            "6329b34e1c67cc8eaf26fe59",
            "634fb73fa2605ff18e47fb32",
            "635128fe3d55e6bff3df149d",
            "6352b8d95ffe9a292c699323",
            "6352b9655ffe9a292c699325",
            "6352bc945ffe9a292c699353",
            "6352be785ffe9a292c69935c",
            "6352bfc45ffe9a292c69936a"
        ]

        // loop cholbe, usersArr.length porjonto
        // random num ( range < historyTypeArr.length ) generate kore jeta pabo 
        // ebong db te history add korbo random number use kore

            for (let j = 0; j < usersArr.length; j++) {
                for (let k = 0; k < bookArr.length; k++) {
                    let body = {
                        text: faker.lorem.lines(2),
                        rating: faker.datatype.number({min:1,max:5}),
                        bookId: bookArr[k],
                        userId: usersArr[j]
                    };

                    await new this.ReviewModel(body).save();

            }
        }

    }

    async findOne(id: string): Promise<Review> {
        return await this.ReviewModel.findById({ _id: id });
    }
    // async findAll(): Promise<Book[]> {
    //   return await this.ReviewModel.find().exec();
    // }
    async update(id: string, body: UpdateReviewDto): Promise<Review> {
        return await this.ReviewModel.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );
    }

    async remove(id: string) {
        return await this.ReviewModel.deleteOne({ _id: id });
    }

    async deleteMany() {
        return await this.ReviewModel.deleteMany({});
    }

    async getReviews(query: QueryReviewDto) {
        // const query = this.ReviewModel.find({});

        // const page: number = parseInt(req['page']) || 1;
        // const limit: number = parseInt(req['limit'] ) || 10;
        // const sortOrder :number = parseInt(req['sortOrder'])|| 1;
        // const sortBy :string = req['sortBy'] || this.;
        // const total = await this.ReviewModel.count();
        // const data = await query.skip((page - 1) * limit).limit(limit).exec();

        // return { data, total };

        var sortObj = {};

        const limit = query.limit || 10;
        const page = query.page || 1;

        const data = await this.ReviewModel.find({})
            .limit(limit)
            .skip((page - 1) * limit)
            .sort(sortObj)
            .exec();
        const total = await this.ReviewModel.count();
        return { data: data, total: total };
    }

    // async searchItems(query) {

    //   let options = {};
    //   const keys = Object.keys(query);
    //   const values = Object.values(query);

    //   options = {
    //     $or: [
    //       { title: new RegExp(values[0], 'i') },
    //       { description: new RegExp(req.query.s.toString(), 'i') }
    //     ]
    //   }

    //   //     const query = this.ReviewModel.find(options);
    // }
}

// async searchItems(query) {

//   let options = {};
//   const keys = Object.keys(query);
//   const values = Object.values(query);

//   options = {
//     $or: [
//       { title: new RegExp(values[0], 'i') },
//       { description: new RegExp(req.query.s.toString(), 'i') }
//     ]
//   }

//   //     const query = this.ReviewModel.find(options);
// }

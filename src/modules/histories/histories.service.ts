import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { HistoryDocument, History } from "src/schemas/history.schema";
import { Review, ReviewDocument } from "src/schemas/review.schema";
import { pipeline } from "stream";
import { DefaultDeserializer } from "v8";
import { BooksController } from "../books/books.controller";
import { CreateHistoryDto, QueryHistoryDto, UpdateHistoryDto } from "./dto/history.dto";


@Injectable()
export class HistoriesService {
    constructor(
        @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
        @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    ) { }


    async create(body: CreateHistoryDto, userid) {
        body["userId"] = userid;
        if (body.type == "like") {
            const likeCount = await this.historyModel.count({
                userId: userid,
                type: body.type,
                bookId: body['bookId']
            })

            if (likeCount > 0) {
                await this.historyModel.deleteOne({
                    userId: userid,
                    type: body.type,
                    bookId: body['bookId']
                })
            }
            else {
                await new this.historyModel(body).save();
            }
        }

        else if (body.type == "dislike") {
            const dislikeCount = await this.historyModel.count({
                userId: userid,
                type: body.type,
                bookId: body['bookId']
            })

            if (dislikeCount > 0) {
                await this.historyModel.deleteOne({
                    userId: userid,
                    type: body.type,
                    bookId: body['bookId']
                })
            }
            else {
                await new this.historyModel(body).save();
            }
        }

        else {
            const shareAndReadCount = await this.historyModel.count({
                userId: userid,
                type: body.type,
                bookId: body['bookId']
            })

            if (shareAndReadCount == 0) {
                await new this.historyModel(body).save();
            }
        }

        return {
            status: "ok"
        }
    }
    async searchIdleBooks(query: QueryHistoryDto) {
        let limit: number | string = query.limit || '10';
        let page: number | string = query.page || '1';
        limit = parseInt(limit as string)
        page = parseInt(page as string)

        var tobeReturnedArr = []
        // const data = await this.historyModel.find({}).limit(limit).skip((page - 1) * limit).sort(
        //     sortObj
        // ).populate("bookId").exec();
        // const total = await this.historyModel.count();
        // return { "data": data, "total": total };

        let topSearches = await this.historyModel.aggregate(
            [
                { $match: { type: "search" } },
                {
                    $group: {
                        _id: "$bookId",
                        // searches: {
                        //     "$sum": { $cond: { if: { "$eq": ["$type", "search"] }, then: 1, else: 0 } }
                        // },
                        totalSearch: { $sum: 1 }
                    }
                },
                {
                    $sort: { "totalSearch": -1 }
                },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                {
                    $lookup: {
                        from: "books",
                        localField: "_id",
                        foreignField: "_id",
                        as: "bookId"
                    }
                },
                {
                    $unwind: "$bookId"
                },
                {
                    $lookup: {
                        from: "authors",
                        localField: "bookId.authorId",
                        foreignField: "_id",
                        as: "bookId.authorId"
                    }
                },
                {
                    $unwind: "$bookId.authorId"
                },
            ]
        );
        let topSearchesItems = []
        for (let i = 0; i < topSearches.length; i++) {
            topSearchesItems.push(topSearches[i].bookId)
        }

        tobeReturnedArr.push({
            title: "Top Searches",
            items: topSearchesItems
        });
        let recentSearches = await this.historyModel.find({ type: "search" }).sort({ createdAt: -1 }).limit(limit).skip((page - 1) * limit).populate({ path: "bookId", populate: { path: "authorId" } }).exec();
        let recentSearchesItems = []
        for (let i = 0; i < recentSearches.length; i++) {
            recentSearchesItems.push(recentSearches[i].bookId)
        }
        tobeReturnedArr.push({
            title: "Recent Searches",
            items: recentSearchesItems
        })
        // // for (let i = 0; i < bookHistories.length; i++) {
        // //     var totalReviewers = await this.reviewModel.count({ "bookId": bookHistories[i]._id });
        // //     bookHistories[i].totalReviewers = totalReviewers;
        // //     var reviewModel = await this.reviewModel.find({ "bookId": bookHistories[i]._id });
        // //     var totalRating = 0;
        // //     for (let j = 0; j < reviewModel.length; j++) {
        // //         totalRating = reviewModel[j].rating + totalRating;
        // //     }
        // //     bookHistories[i].totalRatings = totalRating;

        // //     // totalReviews = rating + totalReviews;
        // //     // totalReviews.push(await this.reviewModel.find({ "rating": { $sum: 1 } }).where({ "bookId": bookHistories[i]._id }));
        // // }
        return tobeReturnedArr;
    }


    async get(query: QueryHistoryDto) {

        let limit: number | string = query.limit || '10';
        let page: number | string = query.page || '1';
        limit = parseInt(limit as string)
        page = parseInt(page as string)
        // var l = parseInt(limit);

        // return await this.historyModel.aggregate([
        //     {
        //         $group: {
        //             _id: "$bookId",
        //             likes: {
        //                 "$sum": { $cond: { if: { "$eq": ["$type", "like"] }, then: 1, else: 0 } }
        //             },
        //             dislikes: {
        //                 "$sum": { $cond: { if: { "$eq": ["$type", "dislike"] }, then: 1, else: 0 } }
        //             },
        //             shares: {
        //                 "$sum": { $cond: { if: { "$eq": ["$type", "share"] }, then: 1, else: 0 } }
        //             },
        //         }
        //     },
        //     { $sort: { likes: -1, dislike: 1, share: -1 } },
        //     {
        //         $skip: (page - 1) * limit
        //     },
        //     { $limit: limit },
        //     {
        //         $lookup: {
        //             from: 'books',
        //             localField: '_id',
        //             foreignField: '_id',
        //             as: 'book',
        //         }
        //     },
        //     {$unwind:'$book'}
        // ]

        // )



        let bookHistories = await this.historyModel.aggregate(
            [
                {
                    $group: {
                        _id: "$bookId",
                        likes: {
                            "$sum": { $cond: { if: { "$eq": ["$type", "like"] }, then: 1, else: 0 } }
                        },
                        dislikes: {
                            "$sum": { $cond: { if: { "$eq": ["$type", "dislike"] }, then: 1, else: 0 } }
                        },
                        shares: {
                            "$sum": { $cond: { if: { "$eq": ["$type", "share"] }, then: 1, else: 0 } }
                        },
                        searches: {
                            "$sum": { $cond: { if: { "$eq": ["$type", "search"] }, then: 1, else: 0 } }
                        },
                        reads: {
                            "$sum": { $cond: { if: { "$eq": ["$type", "read"] }, then: 1, else: 0 } }
                        },
                    }
                },
                {
                    $sort: { "likes": -1, "dislike": 1, "shares": -1, "searches": -1, "reads": -1 }
                },
                { $skip: (page - 1) * limit },
                { $limit: limit },
                {
                    $lookup: {
                        from: "books",
                        localField: "_id",
                        foreignField: "_id",
                        as: "bookDetails"
                    }
                },
                {
                    $unwind: "$bookDetails"
                }
            ]
        );

        for (let i = 0; i < bookHistories.length; i++) {
            var totalReviewers = await this.reviewModel.count({ "bookId": bookHistories[i]._id });
            bookHistories[i].totalReviewers = totalReviewers;
            var reviewModel = await this.reviewModel.find({ "bookId": bookHistories[i]._id });
            var totalRating = 0;
            for (let j = 0; j < reviewModel.length; j++) {
                totalRating = reviewModel[j].rating + totalRating;
            }
            bookHistories[i].totalRatings = totalRating;

            // totalReviews = rating + totalReviews;
            // totalReviews.push(await this.reviewModel.find({ "rating": { $sum: 1 } }).where({ "bookId": bookHistories[i]._id }));
        }
        return bookHistories;
    }


    async findOne(id: string): Promise<History> {
        return await this.historyModel.findById({ _id: id });
    }

    async update(id: string, body: UpdateHistoryDto): Promise<History> {
        return await this.historyModel.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );
    }

    async findSingleBookHistory(id: string) {
        return await this.historyModel.aggregate([
            { $match: { bookId: new mongoose.Types.ObjectId(id) } }, {
                $group: {
                    _id: "$bookId",
                    likes: {
                        "$sum": { $cond: { if: { "$eq": ["$type", "like"] }, then: 1, else: 0 } }
                    },
                    dislikes: {
                        "$sum": { $cond: { if: { "$eq": ["$type", "dislike"] }, then: 1, else: 0 } }
                    },
                    shares: {
                        "$sum": { $cond: { if: { "$eq": ["$type", "share"] }, then: 1, else: 0 } }
                    },
                }
            },
        ]);
    }

    async remove(id: string) {
        return await this.historyModel.deleteOne({ _id: id });
    }

    async deleteMany() {
        return await this.historyModel.deleteMany({});
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
            // "6351249940ef5d60e653fca8",
            // "635124b540ef5d60e653fca9",
            // "635124f740ef5d60e653fcab",
            // "6351252540ef5d60e653fcac"
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
            // "6352b9655ffe9a292c699325",
            // "6352bc945ffe9a292c699353",
            // "6352be785ffe9a292c69935c",
            // "6352bfc45ffe9a292c69936a"
        ]

        // May be enum kora, na thakleo just 3 ta value apatoto
        var historyTypeArr = [
            'read',
            // 'search',
        ]

        // loop cholbe, usersArr.length porjonto
        // random num ( range < historyTypeArr.length ) generate kore jeta pabo 
        // ebong db te history add korbo random number use kore

        for (let i = 0; i < historyTypeArr.length; i++) {
            for (let j = 0; j < usersArr.length; j++) {
                for (let k = 0; k < bookArr.length; k++) {
                    let body = {
                        type: historyTypeArr[i],
                        bookId: bookArr[k],
                        userId: usersArr[j],
                    };

                    await new this.historyModel(body).save();
                }


            }

        }
    }
}

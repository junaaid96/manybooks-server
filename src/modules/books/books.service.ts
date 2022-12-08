import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateBookDto, QueryBookDto, SearchBookDto, UpdateBookDto } from "./dto/book.dto";
import { BookDocument } from "src/schemas/book.schema";
import { Book } from "./entities/book.entity";
import { HistoryDocument, History } from "src/schemas/history.schema";
import { Review, ReviewDocument } from "src/schemas/review.schema";
import { faker } from '@faker-js/faker';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
    @InjectModel(Book.name) private bookModel: Model<BookDocument>
  ) { }

  // create(createBookDto: CreateBookDto) {
  //   return 'This action adds a new Book';
  // }

  async create(body: CreateBookDto, userid): Promise<Book> {
    body["userId"] = userid;
    return await new this.bookModel(body).save();
  }

  async seeder() {
    for (let i = 0; i < 100; i++) {
      let body = {
        name: "" + i,
        author: "" + i,
        description: "" + i,
        genre: "" + i,
        file: "" + i,
        cover: "" + i,
        status: "" + i,
        rejectReason: "" + i,
        numberOfPages: "" + i,
        language: "" + i,
        shares: "" + i,
        userId: "62ea079d890f51f423ec9760",
      };

      await new this.bookModel(body).save();
    }
  }

  async getCategorizedBooks() {
    var tobeReturnedArr = []
    const popularBooks = await this.bookModel.find({})
      .sort({
        createdAt: -1
      }).populate("authorId")
      .limit(10)
    tobeReturnedArr.push({
      title: "Popular Books",
      items: popularBooks
    })
    const recentlyUploadedBooks = await this.bookModel.find({})
      .sort({
        createdAt: -1
      }).populate("authorId")
      .limit(10)
        // tobeReturnedArr.push({
        //   title: "Popular books",
        //   items: popularBooks
        // })
        tobeReturnedArr.push({
            title: "Recently Uploaded",
            items: recentlyUploadedBooks
        })
        return tobeReturnedArr
    }

    async searcIdlehBooks() {
        var tobeReturnedArr = []
        const popularBooks = await this.bookModel.find({})
            .sort({
                createdAt: -1
            }).populate("authorId")
            .limit(10)
        tobeReturnedArr.push({
            title: "Popular Books",
            items: popularBooks
        })
        const recentlyUploadedBooks = await this.bookModel.find({})
            .sort({
                createdAt: -1
            }).populate("authorId")
            .limit(10)
    // tobeReturnedArr.push({
    //   title: "Popular books",
    //   items: popularBooks
    // })
    tobeReturnedArr.push({
      title: "Recently Uploaded",
      items: recentlyUploadedBooks
    })
    return tobeReturnedArr
  }

  async searchBooks(query: SearchBookDto) {
    var search = query['search'];
    var page = query['page'] || 1;
    return await this.bookModel.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "authorId",
          foreignField: "_id",
          as: 'authorId'
        }
      },
      {
        $unwind: "$authorId"
      },
      {
        $match: {
          $or: [
            { name: new RegExp(search, "i") },
            { 'authorId.name': new RegExp(search, "i") },
          ]
        }
      },
      { $skip: (page - 1) * 5 },
      { $limit: 5 },
    ])
  }

  async findOne(id: string, query) {
    const reviewLimit = query.limit || 2;
    var bookDetails = await this.bookModel.findById({ _id: id });
    var totalLikes = await this.historyModel.count({ bookId: id, type: "like" });
    var totalDislikes = await this.historyModel.count({ bookId: id, type: "dislike" });
    var totalShares = await this.historyModel.count({ bookId: id, type: "share" });
    var totalReviews = await this.reviewModel.find({ bookId: id }).limit(reviewLimit);

    return {
      ...bookDetails.toJSON(),
      totalLikes,
      totalDislikes,
      totalShares,
      totalReviews
    }
  }

  async findAll(query) {

  }

  // async findAll(): Promise<Book[]> {
  //   return await this.BookModel.find().exec();
  // }

  async update(id: string, body: UpdateBookDto): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
  }

  async remove(id: string) {
    return await this.bookModel.deleteOne({ _id: id });
  }

  async deleteMany() {
    return await this.bookModel.deleteMany({});
  }

  async getBooks(query: QueryBookDto) {
    // const query = this.BookModel.find({});

    // const page: number = parseInt(req['page']) || 1;
    // const limit: number = parseInt(req['limit'] ) || 10;
    // const sortOrder :number = parseInt(req['sortOrder'])|| 1;
    // const sortBy :string = req['sortBy'] || this.;
    // const total = await this.BookModel.count();
    // const data = await query.skip((page - 1) * limit).limit(limit).exec();

    // return { data, total };

    // const data = await this.bookModel.updateMany({cover: faker.image.avatar()});

    // return data;
    var sortObj = {

    }
    sortObj[`${query.sortBy}`] = query.sortOrder;

    const limit = query.limit || 10;
    const page = query.page || 1;

    // const data = await this.bookModel.find({}).limit(limit).skip((page - 1) * limit).sort(
    //     sortObj
    // ).populate('authorId').exec();
    return await this.bookModel.aggregate(
      // [{
      //             $lookup: {
      //                 from: 'authors',
      //                 localField: 'authorId',
      //                 foreignField: '_id',
      //                 as: 'author'
      //             }
      //         }, {
      //             $unwind: {
      //                 path: '$author'
      //             }
      //         }, {
      //             $project: {
      //                 name: '$author.name'
      //             }
      //         }]
      //             [{
      //                 $lookup: {
      //                     from: 'authors',
      //                     localField: 'authorId',
      //                     foreignField: '_id',
      //                     as: 'author'
      //                 }
      //             }, 
      // {
      //                 $unwind: {
      //                     path: '$author'
      //                 }
      //             },
      //             {
      //                 $group: {
      //                     _id: "$authorId",
      //                     count: { $sum: 1 }
      //                 }
      //             },
      //             ]
      // [
      //     {
      //         $facet: {
      //             data: [{ $match: {} }],
      //             total: [{ $count: 'total' }]
      //         }
      //     },
      //     {
      //         $project: {
      //             "data": "$data",
      //             "total": "$total.total"
      //         }
      //     }
      // ]
                  [{
                       $project: {
                            _id: 1
                       }
                  },

                  ]
    )
  }

  async getMoreRecentSearchBooks(query: QueryBookDto) {
    // const query = this.BookModel.find({});

    // const page: number = parseInt(req['page']) || 1;
    // const limit: number = parseInt(req['limit'] ) || 10;
    // const sortOrder :number = parseInt(req['sortOrder'])|| 1;
    // const sortBy :string = req['sortBy'] || this.;
    // const total = await this.BookModel.count();
    // const data = await query.skip((page - 1) * limit).limit(limit).exec();

    // return { data, total };

    // const data = await this.bookModel.updateMany({cover: faker.image.avatar()});

    // return data;
    // var sortObj = {

    // }
    // sortObj[`${query.sortBy}`] = query.sortOrder;

    const limit = query.limit || 10;
    const page = query.page || 1;

    const data = await this.bookModel.find({}).limit(limit).skip((page - 1) * limit).populate('authorId').exec();
    const total = await this.bookModel.count();
    // return { "data": data, "total": total };
    return data;
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

  //   //     const query = this.Bookmodel.find(options);
  // }

  async getPopularMoretBooks(query: QueryBookDto) {
    // const query = this.BookModel.find({});

    // const page: number = parseInt(req['page']) || 1;
    // const limit: number = parseInt(req['limit'] ) || 10;
    // const sortOrder :number = parseInt(req['sortOrder'])|| 1;
    // const sortBy :string = req['sortBy'] || this.;
    // const total = await this.BookModel.count();
    // const data = await query.skip((page - 1) * limit).limit(limit).exec();

    // return { data, total };

    // const data = await this.bookModel.updateMany({cover: faker.image.avatar()});

    // return data;

    // var tobeReturnedArr = []

    // const popularBooks = await this.bookModel.find({})
    //     .sort({
    //         createdAt: -1
    //     }).populate("authorId")
    //     .limit(10)

    // tobeReturnedArr.push({
    //     title: "Popular Books",
    //     items: popularBooks
    // })

    //         var sortObj = {
    // createdAt: -1
    //         }
    //         sortObj[`${query.sortBy}`] = query.sortOrder;
    // var tobeReturnedArr = [];
    const limit = query.limit || 10;
    const page = query.page || 1;

    const data = await this.bookModel.find({}).limit(limit).skip((page - 1) * limit).sort(
      {
        createdAt: -1
      }
    ).populate('authorId').exec();
    const total = await this.bookModel.count();
    // tobeReturnedArr.push({
    //     "data": data,
    //     "total": total
    // }
    // );

    // return tobeReturnedArr;

    return {
      data: data,
      total: total
    }
  }

  async getRecentMoretBooks(query: QueryBookDto) {
    // const query = this.BookModel.find({});

    // const page: number = parseInt(req['page']) || 1;
    // const limit: number = parseInt(req['limit'] ) || 10;
    // const sortOrder :number = parseInt(req['sortOrder'])|| 1;
    // const sortBy :string = req['sortBy'] || this.;
    // const total = await this.BookModel.count();
    // const data = await query.skip((page - 1) * limit).limit(limit).exec();

    // return { data, total };

    // const data = await this.bookModel.updateMany({cover: faker.image.avatar()});

    // return data;

    // var tobeReturnedArr = []

    // const popularBooks = await this.bookModel.find({})
    //     .sort({
    //         createdAt: -1
    //     }).populate("authorId")
    //     .limit(10)

    // tobeReturnedArr.push({
    //     title: "Popular Books",
    //     items: popularBooks
    // })

    //         var sortObj = {
    // createdAt: -1
    //         }
    //         sortObj[`${query.sortBy}`] = query.sortOrder;
    var tobeReturnedArr = [];
    const limit = query.limit || 10;
    const page = query.page || 1;

    const data = await this.bookModel.find({}).limit(limit).skip((page - 1) * limit).sort(
      {
        createdAt: -1
      }
    ).populate('authorId').exec();
    const total = await this.bookModel.count();
    tobeReturnedArr.push({
      "data": data,
      "total": total
    }
    );
    return {
      data: data,
      total: total
    }
  }

  async test() {
    return await this.bookModel.aggregate([
      // {
      //     $match: {
      //         "name": "Unleash The Dragon"
      //         // "authorId.name": "Arif"
      //         // $or: [
      //         //     { "name": new RegExp("zad", "i") },
      //         //     { "authorId.name": new RegExp("zad", "i") }
      //         // ]
      //     }
      // },
      // {
      //     $lookup: {
      //         from: "authors",
      //         localField: "authorId",
      //         foreignField: "_id",
      //         as: "authorId"
      //     }
      // },
      // {
      //     $unwind: {
      //         path: "$authorId"
      //     }
      // },
    ])
  }

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

  //   //     const query = this.Bookmodel.find(options);
  // }
// }

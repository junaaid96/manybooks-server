import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../../schemas/user.schema";
import { JwtService } from "@nestjs/jwt";
import { TokenVerifier } from "src/utils/TokenVerifier";
import { TestLoginUserDto, UpdateUserDto, LoginUserDto } from "./dto/user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }

  async seeder() {
    for (let i = 0; i < 100; i++) {
      let body = {
        name: "" + i,
        email: "" + i,
      };

      await new this.userModel(body).save();
    }
  }

  async getAllUsers(query) {
    var sortObj = {

    }
    sortObj[`${query.sortBy}`] = query.sortOrder;

    const limit = query.limit || 10;
    const page = query.page || 1;

    const data = await this.userModel.find({}).limit(limit).skip((page - 1) * limit).sort(
      sortObj
    ).exec();
    const total = await this.userModel.count();
    // return { "data": data, "total": total };
return await this.userModel.aggregate(
[{
 $project: {
  _id: 1
 }
},

]
)
  }

  async createUser(body) {
    this.userModel.create(body);
    return 1;
  }
  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }

  // async getSlug(fullName: string) {
  //   const count = await this.userModel.count({ fullName: fullName });
  //   if (count === 0) {
  //     const slug = fullName.toLowerCase().split(" ").join("_");
  //     return slug;
  //   } else {
  //     const slug = fullName.toLowerCase().split(" ").join("_") + count;
  //     return slug;
  //   }
  // }

  async login(loginUserDto: LoginUserDto) {
    const { token, tokenType } = loginUserDto;
    var isVerified = true;
    var accessToken = null;

    console.log(`isVerified: ${isVerified}`);

    if (isVerified) {
      const { email, name } = loginUserDto;

      console.log(`email: ${email}`);
      console.log(`fullName: ${name}`);

      const creatUser = await this.userModel.findOneAndUpdate(
        { email: email },
        {
          $set: {
            ...loginUserDto,
          },
        },
        { upsert: true, new: true }
      );

      accessToken = this.jwtService.sign({
        _id: creatUser._id,
        email: creatUser.email,
      });
    }

    return {
      access_token: accessToken,
    };
  }

  async getUserDetails(user: string) {
    return await this.userModel.findOne({ _id: user });
  }

  async updateUser(email: string, body: UpdateUserDto) {
    delete body.email;
    const uu = await this.userModel.findOneAndUpdate(
      { email: email },
      { $set: body },
      { new: true }
    );
    return uu;
  }

  // async testLogin(loginUserDto: TestLoginUserDto) {
  //   const { email, fullName } = loginUserDto;

  //   const user = await this.userModel.findOne({ email: email });

  //   if (!user) {
  //     loginUserDto["slug"] = await this.getSlug(fullName);
  //   }

  //   const creatUser = await this.userModel.findOneAndUpdate(
  //     { email: email },
  //     { $set: loginUserDto, occupation: "CEO" },
  //     { upsert: true, new: true }
  //   );
  //   const accessToken = this.jwtService.sign({
  //     _id: creatUser._id,
  //     email: creatUser.email,
  //   });

  //   return {
  //     loginUserDto,
  //     access_token: accessToken,
  //   };
  // }

  async delete() {
    return await this.userModel.deleteMany();
  }
}

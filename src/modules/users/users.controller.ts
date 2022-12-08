import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Delete,
  UseGuards,
  Put,
  Query,
  Param,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { TestLoginUserDto, UpdateUserDto, LoginUserDto, QueryUserDto } from "./dto/user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() body) {
    return this.usersService.createUser(body);
  }
  @Get('seeder')
  async seeder() {
    return await this.usersService.seeder()
  }


  @Post("/login")
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }

  // @Post("/testLogin")
  // testLogin(@Body() loginUserDto: TestLoginUserDto) {
  //   return this.usersService.testLogin(loginUserDto);
  // }

  @Get()
//   @UseGuards(AuthGuard("jwt"))
  async getAllUsers(@Query() queries: QueryUserDto) {
    return await this.usersService.getAllUsers(queries);
  }


  // @Get()
  // @UseGuards(AuthGuard("jwt"))
  // getAllUser(@Request() req) {
  //   return this.usersService.getUserDetails(req.user);
  // }

  @Get("/profile")
  @UseGuards(AuthGuard("jwt"))
  getProfile(@Request() req) {
    // return this.usersService.getUserDetails(req.user);
    return req.user
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async remove(@Param("id") id: string) {
    return await this.usersService.remove(id);
  }

  // @Put("/")
  // @UseGuards(AuthGuard("jwt"))
  // updateProfile(@Request() req, @Body() body: UpdateUserDto) {
  //   return this.usersService.updateUser(req.user["email"], body);
  // }

  // @Delete()
  // async Delete() {
  //   return await this.usersService.delete();
  // }

  // @Get('/tetetetetet')
  // tetetetetet(@Query() queries) {
  //   // console.log(queries)
  //   // { title: new RegExp(values[0], 'i') },
  //   let arr = [];
  //   const keys = Object.keys(queries);
  //   for (var i = 0; i < keys.length; i++) {
  //     var name = keys[i];
  //     arr.push({
  //       name: new RegExp(queries[keys[i]], 'i')
  //     })
  //   }
  //   return arr
  // }
}

import { Controller, Get, Post, Body, Put, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AuthorService } from './authors.service';
import { CreateAuthorDto,QueryAuthorDto,UpdateAuthorDto } from './dto/author.dto';
import { AuthGuard } from "@nestjs/passport";

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorService) {}

  @Post()
  @UseGuards (AuthGuard("jwt"))
  async create(@Body() body: CreateAuthorDto) {
    return await this.authorsService.create(body);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async findAll(@Query () queries: QueryAuthorDto) {
    return await this.authorsService.getAuthors(queries);
  }

  // @Get('seeder')
  // @UseGuards(AuthGuard("jwt"))
  // async seeder(@Param("id") id: string) {
  //     return await this.authorsService.seeder()
  // }

  @Get("byId/:id")
  @UseGuards(AuthGuard("jwt"))
  async findOne(@Param("id") id: string) {
      return await this.authorsService.findOne(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard("jwt"))
  async update(@Param("id") id: string, @Body() Body: UpdateAuthorDto) {
      return await this.authorsService.update(id, Body);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async remove(@Param("id") id: string) {
      return await this.authorsService.remove(id);
  }

  @Delete()
  @UseGuards(AuthGuard("jwt"))
  async deleteMany() {
      return await this.authorsService.deleteMany();
  }
}
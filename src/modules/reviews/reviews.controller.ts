import { Controller, Get, Post, Request, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto, QueryReviewDto, UpdateReviewDto } from './dto/review.dto';
import { AuthGuard } from "@nestjs/passport";
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Post("")
  @UseGuards(AuthGuard("jwt"))
  async create(@Body() body: CreateReviewDto, @Request() req) {
    return await this.reviewsService.create(body, req.user._id);
  }

@Get()
  @UseGuards(AuthGuard("jwt"))
  async findAll(@Query() queries: QueryReviewDto) {
    return await this.reviewsService.getReviews(queries);
  }

  @Get('seeder')
  //   @UseGuards(AuthGuard("jwt"))
  async seeder(@Param("id") id: string) {
    return await this.reviewsService.seeder()
  }

  @Get("byId/:id")
  @UseGuards(AuthGuard("jwt"))
  async findOne(@Param("id") id: string) {
    return await this.reviewsService.findOne(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard("jwt"))
  async update(@Param("id") id: string, @Body() Body: UpdateReviewDto) {
    return await this.reviewsService.update(id, Body);
  }



  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async remove(@Param("id") id: string) {
    return await this.reviewsService.remove(id);
  }

  @Delete()
  @UseGuards(AuthGuard("jwt"))
  async deleteMany() {
    return await this.reviewsService.deleteMany();
  }
}
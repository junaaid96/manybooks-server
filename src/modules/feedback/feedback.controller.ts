import { Controller, Post, UseGuards, Body, Get, Param, Put, Request,Query, Delete } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateFeedbackDto, FeedbackQueryDto, UpdateFeedbackDto } from "./dto/feedback.dto";
import { FeedbackService } from "./feedback.service";

@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post("")
  @UseGuards(AuthGuard("jwt"))
  async create(@Body() body: CreateFeedbackDto, @Request() req) {
    return await this.feedbackService.create(body, req.user._id);
  }

  @Get('seeder')
  async seeder(@Param('id') id: string) {
    return await this.feedbackService.seed()
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async findAll(@Query() query: FeedbackQueryDto) {
    return await this.feedbackService.getFeedbacksSorted(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard("jwt"))
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard("jwt"))
  update(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackService.update(id, updateFeedbackDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard("jwt"))
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(id);
  }

  @Delete()
    @UseGuards(AuthGuard("jwt"))
    async deleteMany() {
        return await this.feedbackService.deleteMany();
    }
}
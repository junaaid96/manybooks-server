import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, UseGuards, Put } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateStoryDto, QueryStoryDto, UpdateStoryDto } from './dto/story.dto';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) { }

  @Post("")
  @UseGuards(AuthGuard("jwt"))
  async create(@Body() body: CreateStoryDto, @Request() req) {
    return await this.storiesService.create(body, req.user._id);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async findAll(@Query() queries: QueryStoryDto) {
    return await this.storiesService.getStories(queries);
  }

  @Get("byId/:id")
  @UseGuards(AuthGuard("jwt"))
  async findOne(@Param("id") id: string) {
    return await this.storiesService.findOne(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard("jwt"))
  async update(@Param("id") id: string, @Body() Body: UpdateStoryDto) {
    return await this.storiesService.update(id, Body);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async remove(@Param("id") id: string) {
    return await this.storiesService.remove(id);
  }

  @Delete()
  @UseGuards(AuthGuard("jwt"))
  async deleteMany() {
    return await this.storiesService.deleteMany();
  }

  @Get('seeder')
  @UseGuards(AuthGuard("jwt"))
  async seeder(@Param("id") id: string) {
    return await this.storiesService.seeder()
  }
}

import { Controller, Get, Post, Body, Request, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateHistoryDto, QueryHistoryDto, UpdateHistoryDto } from './dto/history.dto';
import { HistoriesService } from './histories.service';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) { }

  @Post("")
  @UseGuards(AuthGuard("jwt"))
  async create(@Body() body: CreateHistoryDto, @Request() req) {
    return await this.historiesService.create(body, req.user._id);
  }

  @Get()
  //   @UseGuards(AuthGuard("jwt"))
  async findAll(@Query() queries: QueryHistoryDto) {
    return await this.historiesService.get(queries);
  }

  @Get("searchIdle")
//   @UseGuards(AuthGuard("jwt"))
  async searchIdle(@Query() queries: QueryHistoryDto) {
    return await this.historiesService.searchIdleBooks(queries);
  }

  @Get("byId/:id")
  @UseGuards(AuthGuard("jwt"))
  async findOne(@Param("id") id: string) {
    return await this.historiesService.findOne(id);
  }

  @Put(":id")
  @UseGuards(AuthGuard("jwt"))
  async update(@Param("id") id: string, @Body() Body: UpdateHistoryDto) {
    return await this.historiesService.update(id, Body);
  }

  @Get("byBookId/:id")
  async findSignleBook(@Param('id') id:string) {
    return await this.historiesService.findSingleBookHistory(id);
  }

  @Delete(":id")
  @UseGuards(AuthGuard("jwt"))
  async remove(@Param("id") id: string) {
    return await this.historiesService.remove(id);
  }

  @Delete()
  @UseGuards(AuthGuard("jwt"))
  async deleteMany() {
    return await this.historiesService.deleteMany();
  }

  @Get('seeder')
  //   @UseGuards(AuthGuard("jwt"))
  async seeder(@Param("id") id: string) {
    return await this.historiesService.seeder()
  }
}

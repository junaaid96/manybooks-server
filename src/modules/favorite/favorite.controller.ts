import { Controller, Get, Post, Body, Request, Param, Delete, Query, UseGuards, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query } from 'express';
import { CreateFavoriteDto, FavoriteQueryDto, UpdateFavoriteDto } from './dto/favorite.dto';
import { FavoriteService } from './favorite.service';

@Controller('favorites')
export class FavoriteController {
  FavoriteModel: any;
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post("")
  @UseGuards(AuthGuard("jwt"))
  async create(@Body() body: CreateFavoriteDto, @Request() req) {
    return await this.favoriteService.create(body, req.user._id);
  }

  @Get('seeder')
  async seeder(@Param('id') id: string) {
    return await this.favoriteService.seed()
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async findAll(@Query() query: FavoriteQueryDto) {
    return await this.favoriteService.sortedFavorite(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard("jwt"))
  findOne(@Param('id') id: string) {
    return this.favoriteService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard("jwt"))
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoriteService.update(id, updateFavoriteDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard("jwt"))
  remove(@Param('id') id: string) {
    return this.favoriteService.remove(id);
  }

  @Delete()
    @UseGuards(AuthGuard("jwt"))
    async deleteMany() {
        return await this.favoriteService.deleteMany();
    }
}

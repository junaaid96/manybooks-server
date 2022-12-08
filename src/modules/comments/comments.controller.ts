import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentDto, QueryCommentDto, UpdateCommentDto } from './dto/comments.dto';
// import { CreateCommentDto } from './dto/create-comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

    @Post("")
    @UseGuards(AuthGuard("jwt"))
    async create(@Body() body, @Request() req) {
        return await this.commentsService.create(body, req.user._id);
    }

    @Get()
    async findAll(@Query() queries: QueryCommentDto) {
        return await this.commentsService.findAll(queries);
    }

    @Get('seeder')
    //   @UseGuards(AuthGuard("jwt"))
    async seeder(@Param("id") id: string) {
        return await this.commentsService.seeder()
    }

    @Get('byId/:id')
    async findOne(@Param('id') id: string) {
        return await this.commentsService.findOne(id);
    }




    @Put('byId/:id')
    async update(@Param('id') id: string, @Body() body: UpdateCommentDto) {
        return await this.commentsService.update(id, body);
    }

    @Delete('byId/:id')
    remove(@Param('id') id: string) {
        return this.commentsService.remove(id);
    }

    @Delete()
    // @UseGuards(AuthGuard("jwt"))
    async deleteMany() {
        return await this.commentsService.deleteMany();
    }
}

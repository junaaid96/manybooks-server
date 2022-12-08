import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { QueryBookDto } from '../books/dto/book.dto';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';
import { NotesService } from './notes.service';

@Controller('note')
export class NotesController {
    constructor(private readonly noteService: NotesService) { }

    @Post()
    async create(@Body() body: CreateNoteDto) {
        return await this.noteService.create(body);
    }

    @Get()
    async findAll(@Query() queries: QueryBookDto) {
        return await this.noteService.findAll(queries);
    }

    @Get('seeder')
    //   @UseGuards(AuthGuard("jwt"))
    async seeder(@Param("id") id: string) {
        return await this.noteService.seeder()
    }

    @Get('byId/:id')
    async findOne(@Param('id') id: string) {
        return await this.noteService.findOne(id);
    }




    @Put('byId/:id')
    async update(@Param('id') id: string, @Body() body: UpdateNoteDto) {
        return await this.noteService.update(id, body);
    }

    @Delete('byId/:id')
    remove(@Param('id') id: string) {
        return this.noteService.remove(id);
    }

    @Delete()
    // @UseGuards(AuthGuard("jwt"))
    async deleteMany() {
        return await this.noteService.deleteMany();
    }
}

import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Request,
    UseGuards,
    Query,
    Req,
    Patch,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import {
    CreateBookDto,
    QueryBookDto,
    SearchBookDto,
    UpdateBookDto,
} from "./dto/book.dto";
import { AuthGuard } from "@nestjs/passport";
import { query } from "express";

@Controller("books")
export class BooksController {
    constructor(private readonly booksService: BooksService) { }

    @Post("")
    @UseGuards(AuthGuard("jwt"))
    async create(@Body() body: CreateBookDto, @Request() req) {
        return await this.booksService.create(body, req.user._id);
    }

    @Get()
    // @UseGuards(AuthGuard("jwt"))
    async findAll(@Query() queries: QueryBookDto) {
        // return await this.booksService.findAll();
        return await this.booksService.getBooks(queries);
    }
    @Get("recentsearched")
    @UseGuards(AuthGuard("jwt"))
    async recentSearchBooks(@Query() queries: QueryBookDto) {
        // return await this.booksService.findAll();
        return await this.booksService.getMoreRecentSearchBooks(queries);
    }

    @Get("seeder")
    @UseGuards(AuthGuard("jwt"))
    async seeder(@Param("id") id: string) {
        return await this.booksService.seeder();
    }

    @Get("byId/:id")
    @UseGuards(AuthGuard("jwt"))
    async findOne(@Param("id") id: string, @Query() query) {
        return await this.booksService.findOne(id, query);
    }

    @Get("categorized")
    @UseGuards(AuthGuard("jwt"))
    async categorized(@Query() query) {
        return await this.booksService.getCategorizedBooks();
    }
    @Get("searchidle")
    @UseGuards(AuthGuard("jwt"))
    async searchidle() {
        return await this.booksService.searcIdlehBooks();
    }
    @Get("popularmorebooks")
    @UseGuards(AuthGuard("jwt"))
    async popularbooks(@Query() queries: QueryBookDto) {
        return await this.booksService.getPopularMoretBooks(queries);
    }

    @Get("recentmorebooks")
    @UseGuards(AuthGuard("jwt"))
    async recentbooks(@Query() queries: QueryBookDto) {
        return await this.booksService.getRecentMoretBooks(queries);
    }

    @Get("search")
    @UseGuards(AuthGuard("jwt"))
    async search(@Query() query: SearchBookDto) {
        return await this.booksService.searchBooks(query);
    }


    @Put(":id")
    @UseGuards(AuthGuard("jwt"))
    async update(@Param("id") id: string, @Body() Body: UpdateBookDto) {
        return await this.booksService.update(id, Body);
    }

    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    async remove(@Param("id") id: string) {
        return await this.booksService.remove(id);
    }

    @Delete()
    @UseGuards(AuthGuard("jwt"))
    async deleteMany() {
        return await this.booksService.deleteMany();
    }

    // @Get('test')
    // async test() {
    //     return await this.booksService.test()
    // }

    // @Get('search')
    // // @UseGuards(AuthGuard("jwt"))
    // async searchItems(@Query() query){
    //   return await this.booksService.searchItems(query);
    // }
}

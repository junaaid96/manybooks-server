import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteDocument } from 'src/schemas/note.schema';
import { CreateNoteDto, QueryNoteDto, UpdateNoteDto } from './dto/note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
    constructor(@InjectModel(Note.name) private NoteModel: Model<NoteDocument>) { }
    async create(body: CreateNoteDto): Promise<Note> {
        return await new this.NoteModel(body).save();
    }

    async seeder() {
        for (let i = 0; i < 100; i++) {
            let body = {
                text: "" + i,
                // bookId: "" + i,
                color: "" + i,
                type: "" + i
            };

            await new this.NoteModel(body).save();
        }

        return 1;
    }

    async findAll(query: QueryNoteDto) {
        var sortObj = {

        }
        sortObj[`${query.sortBy}`] = query.sortOrder;

        const limit = query.limit || 10;
        const page = query.page || 1;

        const data = await this.NoteModel.find({}).limit(limit).skip((page - 1) * limit).sort(
            sortObj
        ).exec();
        const total = await this.NoteModel.count();
        return { "data": data, "total": total };
    }

    async findOne(id: string): Promise<Note> {
        return await this.NoteModel.findById({ _id: id });
    }

    async update(id: string, body: UpdateNoteDto): Promise<Note> {
        return await this.NoteModel.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        );
    }

    async remove(id: string) {
        return await this.NoteModel.deleteOne({ _id: id });
    }

    async deleteMany() {
        return await this.NoteModel.deleteMany({});
    }
}

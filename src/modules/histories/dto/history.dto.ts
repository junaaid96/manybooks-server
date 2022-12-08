import { IsNotEmpty } from 'class-validator';


export class CreateHistoryDto {
    @IsNotEmpty()
    type: string;

    @IsNotEmpty()
    bookId: string;

}

export class UpdateHistoryDto {
    type: string;
    bookId: string;

}

export class QueryHistoryDto {
    page: string;
    limit: string;
    sortBy: string;
    sortOrder: number;
}

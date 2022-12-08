export class FavoriteQueryDto{
    limit: number;
    page: number;
}


export class CreateFavoriteDto {
    bookId: string;
}

export class UpdateFavoriteDto {
    bookId: string;
}


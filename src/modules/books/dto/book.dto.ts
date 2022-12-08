import { IsNotEmpty, } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  authorId: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  file: string;

  @IsNotEmpty()
  cover: string;
  
  // @IsNotEmpty()
  // status: string;
  
  // @IsNotEmpty()
  // rejectReason: string;
  
  @IsNotEmpty()
  numberOfPages: number;
  
  @IsNotEmpty()
  language: string;
  
  // @IsNotEmpty()
  // shares: number;
}

export class UpdateBookDto {
  name: string;
  authorId: string;
  description: string;
  genre: string;
  file: string;
  cover: string;
  status: string;
  rejectReason: string;
  numberOfPages: string;
  language: string;
  shares: string
}

export class QueryBookDto {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: number;
}

export class SearchBookDto{
  search: string;
  page: number;
}
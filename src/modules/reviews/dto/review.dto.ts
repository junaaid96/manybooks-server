import { IsNotEmpty } from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  bookId: string;
}

export class UpdateReviewDto {
  text: string;
  rating: number;
  bookId: string;
}

export class QueryReviewDto {
    limit: number;
    page: number;
}

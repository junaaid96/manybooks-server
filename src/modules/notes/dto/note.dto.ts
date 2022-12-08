import { IsNotEmpty } from 'class-validator';


// name
// 	authorid
// 	description
// 	genre
// 	status [published, pending, rejected]
// 	rejectReason(text)
// 	file
// 	userid(uploader)
// 	shares
// 	numberOfPages
// 	cover
//     language


export class CreateNoteDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  bookId: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  type: string;
}

export class UpdateNoteDto {
text: string;
bookId: string;
color: string;
type: string;
}

export class QueryNoteDto {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: number;
}
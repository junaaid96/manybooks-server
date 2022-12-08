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


export class CreateCommentDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  storyId: string;
}

export class UpdateCommentDto {
text: string;
userId: string;
storyId: string;
}

export class QueryCommentDto {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: number;
}
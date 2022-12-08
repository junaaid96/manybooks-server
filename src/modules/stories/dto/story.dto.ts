import { IsNotEmpty } from 'class-validator';


// image
// 	userid
// 	text(opt)
// 	likes
// 	link(opt)


export class CreateStoryDto {
    @IsNotEmpty()
    image: string;

    text: string;

    // @IsNotEmpty()
    likes: string;

    link: string;

}

export class UpdateStoryDto {
    name: string;
    text: string;
    likes: string;
    links: string;

}

export class QueryStoryDto {
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: number;
}

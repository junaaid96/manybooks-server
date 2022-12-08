export class FeedbackQueryDto{
    limit: number;
    page: number;
}

export class CreateFeedbackDto {
    text: string;
    isResolved: boolean;
    image: string;
}

export class UpdateFeedbackDto {
    text: string;
    isResolved: boolean;
    image: string;
}
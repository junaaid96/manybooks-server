import { IsNotEmpty } from "class-validator";

export class CreateAuthorDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    avatar: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    birth: string;

    @IsNotEmpty()
    death: string;

    @IsNotEmpty()
    wikipedia: string;

    // @IsNotEmpty()
    // isVerified: boolean;

}


export class UpdateAuthorDto {
  name: string;
  avatar: string;
  description: string;
  birth: string;
  death: string;
  wikipedia: string;
  isVerified: string;
}

export class QueryAuthorDto {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: number;
}
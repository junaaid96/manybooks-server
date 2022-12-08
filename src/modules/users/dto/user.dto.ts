import { IsEmail, IsEnum, IsNotEmpty } from "class-validator";

export class CreateUserDto { }

class TokenTypes {
  facebook = "facebook";
  google = "google";
}

export class LoginUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  avatar: string;
  role: string;

  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  // @IsEnum(TokenTypes)
  tokenType: TokenTypes;
  //   avatar: string;
}

// name
// 	email
// 	avatar
// 	role [admin, user, blocked]
// 	(slug)*

export class TestLoginUserDto {
  name: string;
  email: string;
}
export class UpdateUserDto {
  full_name: string;
  email: string;
  avatar: string;
  role: string;
  token: string;
  token_type: string;
}
export class QueryUserDto {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: number;
}
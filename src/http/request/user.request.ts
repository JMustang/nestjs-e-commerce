import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UserRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  role_ids: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  cart: [];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  order: any;
}

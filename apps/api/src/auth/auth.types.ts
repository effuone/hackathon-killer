import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsNotEmpty, IsString } from 'class-validator';

export interface UserJwtPayload {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export class RegistrationRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}

export class LoginUserRequestDto {
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  password: string;
}

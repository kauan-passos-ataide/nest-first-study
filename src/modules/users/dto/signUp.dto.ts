import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

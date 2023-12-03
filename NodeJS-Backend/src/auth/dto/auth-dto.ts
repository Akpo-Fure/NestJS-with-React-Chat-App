import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('NG')
  phoneNo: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class SignInDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

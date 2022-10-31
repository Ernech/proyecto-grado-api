import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"


export class PersonalDataDTO {

  @IsString()
  @IsNotEmpty()
  firstLastName: string

  @IsString()
  @IsNotEmpty()
  secondLastName: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  marriedLastName: string

  @IsString()
  @IsNotEmpty()
  personalIdNumber: string

  @IsString()
  @IsNotEmpty()
  issued: string

  @IsString()
  @IsNotEmpty()
  idType: string

  @IsString()
  @IsNotEmpty()
  gender: string

  @IsString()
  @IsNotEmpty()
  civilStatus: string;

  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  placeOfBirth: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  zone: string;

  @IsString()
  @IsNotEmpty()
  afp: string;

  @IsString()
  @IsNotEmpty()
  cuaNumber: string;

  @IsString()
  @IsNotEmpty()
  homePhone: string;

  @IsString()
  @IsNotEmpty()
  cellPhone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  personalIdFile: Buffer;

  @IsNumber()
  teachingStartYear:number;

  @IsNumber()
  teachingUCBStartYear:number;


  @IsNumber()
  professionalStartYear: number;



}   
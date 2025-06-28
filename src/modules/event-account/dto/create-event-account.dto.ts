import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateEventAccountDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    device_id?: string;
}

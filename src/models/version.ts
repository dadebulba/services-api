import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUpdateVersionDTO {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string

    @IsOptional()
    @IsString({ message: 'Description must be a string' })
    description?: string

    @IsNotEmpty({ message: 'Name is required' })
    @IsInt({ message: 'Service id must be an integer' })
    service: number
}
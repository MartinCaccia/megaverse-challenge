import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class bodyRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  row?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  column?: number;
}

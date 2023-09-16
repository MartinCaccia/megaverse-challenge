import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, Body, Post, HttpCode, Get, Delete } from '@nestjs/common';
import { MegaverseService } from './megaverse.service';
import { bodyRequestDto } from './dto/body-request.dto';


@Controller('v1')
@ApiTags('challenge-megaverse')
export class MegaverseController {
  constructor(
    private readonly megaverseService: MegaverseService,
  ) {}

  @ApiOperation({
    description: 'Create planets in megaverse',
  })
  @ApiUnauthorizedResponse({
    description: 'Provided credentials are not valid',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiInternalServerErrorResponse({ description: 'Unexpected error' })
  @Post('/create/planets')
  @HttpCode(200)
  async createPlanets(@Body() body: bodyRequestDto): Promise<void> {
    return await this.megaverseService.createPlanets(body);
  }
  @ApiOperation({
    description: 'Delete planets in megaverse',
  })
  @Delete('/delete/planets')
  @HttpCode(200)
  async deletePlanets(@Body() body: bodyRequestDto): Promise<void> {
    return await this.megaverseService.deletePlanets(body);
  }
  @ApiOperation({
    description: 'Get the goal map megaverse',
  })
  @Get('/goal/map')
  @HttpCode(200)
  async getGoalMap(): Promise<any> {
    return await this.megaverseService.getGoalMap();
  }
  @ApiOperation({
    description: 'Get the goal candidate map megaverse',
  })
  @Get('/goal/map/candidate')
  @HttpCode(200)
  async getGoalCandidateMap(): Promise<any> {
    return await this.megaverseService.getCandidateGoalMap();
  }  
}

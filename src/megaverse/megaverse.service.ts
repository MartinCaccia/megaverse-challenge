import { BadRequestException, ConflictException, HttpStatus, 
  Injectable, InternalServerErrorException, Logger, 
  NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, retry, timer } from 'rxjs';
import { AxiosError } from 'axios';
import findWordPositions from './common/findWordPositions';
import { bodyRequestDto } from './dto/body-request.dto';

@Injectable()
export class MegaverseService {
  private readonly candidateId: string;
  private readonly megaverseURL: string;
  private readonly megaversePlanetsURN: string;
  private readonly megaverseSunMoonURN: string; //comming soon...
  private readonly megaverseComethsURN: string; //comming soon...
  private readonly megaverseGoalURN: string;
  private readonly logger = new Logger(MegaverseService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.candidateId = this.configService.get<string>(
      'candidate_id'
    );    
    this.megaverseURL = this.configService.get<string>(
      'megaverse_url'
    );
    this.megaversePlanetsURN = this.configService.get<string>(
      'polyanets_urn'
    );
    this.megaverseGoalURN = this.configService.get<string>(
      'goal_urn'
    );    
  }

  async getGoalMap(): Promise<number[][]> {
    try {
      const mapGoalRes = await lastValueFrom(
        this.httpService.get<any>(
          `${this.megaverseGoalURN}${this.candidateId}/goal`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      ); 
      // Next version of the function with a dynamic parameter input 
      // an enum and posibility of search more words.        
      const coordinates = findWordPositions("POLYANET", mapGoalRes.data.goal);      
      return coordinates;
    } catch (error) {
      this.logger.error(
        `Service getGoalMap Error, ${error?.response?.data}`,
      );      
      this.handleExceptions(error); 
    }
  }

  async getCandidateGoalMap(): Promise<any> {
    try {
      const mapCandidateRes = await lastValueFrom(
        this.httpService.get<any>(
          `${this.megaverseGoalURN}${this.candidateId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ),
      );               
      return mapCandidateRes.data;
    } catch (error) {
      this.logger.error(
        `Service getCandidateGoalMap Error, ${error?.response?.data}`,
      );
      this.handleExceptions(error); 
    }
  }

  /**
   * createPlanets method
   * Could receive a [row,column] coordinate to create a planet in megaverse
   * or could receive nothing then create the candidate goal map
   * 
   * @param body
  **/
  async createPlanets(body: bodyRequestDto): Promise<any> { 
    try {
      let positions: number[][];
      // if body is null then get the goal challenge map.
      if(Object.keys(body).length === 0){
        positions = await this.getGoalMap();
      } else {
        positions = [[body.row, body.column]];
      }
      const candidateId = this.candidateId;
      
      positions.map(async (position) => {
        const [row, column] = position;

        await lastValueFrom( this.httpService.post<any>(
            `${this.megaversePlanetsURN}`,
            JSON.stringify({ row, column, candidateId}),
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .pipe(            
            retry({ count: 3, delay: this.shouldRetry }),          
          )                   
        )
      })
    } catch (error) {
      this.logger.error(
        `Service create planets Error, ${error?.response?.data}`,
      );
      this.handleExceptions(error);      
    }
  }


  /**
   * Custom method to check the error to retry
   * 
   * @param error an AxiosError.
  **/
  shouldRetry(error: AxiosError) {
    if (error.response.status === 429) {
      return timer(3000);
    }
    throw error;
  }

  /**
   * deletePlanets method
   * Could receive a [row,column] coordinate to delete a planet in megaverse
   * or could receive nothing then delete the whole candidate goal map
   * 
   * @param body
  **/
  async deletePlanets(body: bodyRequestDto): Promise<any> { 
    try {
      let positions: number[][];
      if(Object.keys(body).length === 0){
        positions = await this.getGoalMap();
      } else {
        positions = [[body.row, body.column]];
      }
      const candidateId = this.candidateId;

      positions.map(async (position) => {
        const [row, column] = position;

        await lastValueFrom( this.httpService.delete<any>(
          `${this.megaversePlanetsURN}`,
          {
            data: JSON.stringify({ row, column, candidateId}),               
            headers: {
              'Content-Type': 'application/json',
            },              
          }
          )
          .pipe(            
            retry({ count: 3, delay: this.shouldRetry }),          
          )                   
        )

      })
    } catch (error) {
      this.logger.error(
        `Service delete planets Error, ${error?.response?.data}`,
      );
      this.handleExceptions(error);      
    }
  }

  /**
   * Custom method to handle error exceptions
   * 
   * @param error
  **/
  private handleExceptions(error: any) {
    if (error?.response?.status === 404) {
      throw new NotFoundException(
        'NOT_FOUND',
        error.response.data.errorMessage,
      );
    }    
    if (error?.response?.status === 409) {
      throw new ConflictException(
        'CONFLICT',
        error.response.data.errorMessage,
      );
    }
    if (error?.response?.status === 400) {
      throw new BadRequestException('BAD_REQUEST', error.response.data);
    }
    if (error?.response?.status < HttpStatus.INTERNAL_SERVER_ERROR) {
      throw new ServiceUnavailableException(
        'EXTERNAL_SERVICE_ERROR', 
        `An external service error`
      );
    } else {
      throw new InternalServerErrorException(
        'INTERNAL_SERVER_ERROR',
        'An internal server error',
      );
    }
  }
}

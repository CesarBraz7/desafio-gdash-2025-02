import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { GenerateInsightService } from './generate-insight.service';
import { GenerateInsightDto } from '../../dto/generate-insight.dto';
import { JwtAuthGuard } from '../../../../shared/guards/jwt-auth.guard';
import { API_ROUTES } from '../../../../shared/constants/api-routes';

@Controller(API_ROUTES.INSIGHTS.BASE)
@UseGuards(JwtAuthGuard)
export class GenerateInsightController {
  constructor(private readonly generateInsightService: GenerateInsightService) {}

  @Post(API_ROUTES.INSIGHTS.GENERATE)
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async generate(@Body() generateInsightDto: GenerateInsightDto) {
    return this.generateInsightService.generate(generateInsightDto);
  }
}

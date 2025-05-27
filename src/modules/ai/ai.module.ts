import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { GoalsModule } from '../goals/goals.module';

@Module({
  imports: [GoalsModule],
  providers: [AiService],
  controllers: [AiController]
})
export class AiModule { }

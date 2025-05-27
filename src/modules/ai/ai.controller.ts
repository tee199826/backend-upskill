import { Controller, Get, Param, Inject } from '@nestjs/common';
import { AiService } from './ai.service';
import { GoalsService } from '../goals/goals.service';

@Controller('ai')
export class AiController {
    constructor(
        private readonly aiService: AiService,
        private readonly goalsService: GoalsService,
    ) {}

    @Get('goal-advice/:goalId')
    async getAdvice(@Param('goalId') goalId: number) {
        const goal = await this.goalsService.findOne(goalId);
        if (!goal) {
            throw new Error('Goal not found');
        }
        return this.aiService.getSavingAdvice(goal.goalName, goal.amountTarget, goal.currentAmount, goal.dueDate.toString());
    }
}

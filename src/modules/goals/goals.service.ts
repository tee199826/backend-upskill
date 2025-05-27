import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateGoalDto } from './dto/goals.dto';

@Injectable()
export class GoalsService {
    constructor(@InjectRepository(Goal) private repo: Repository<Goal>) { }

    create(data: Partial<CreateGoalDto>) {
        const { userId, ...goal } = data;
        const entity = this.repo.create({
            ...goal,
            user: { id: userId },
        });
        return this.repo.save(entity);
    }

    findAll() {
        return this.repo.find({ relations: ['user'] });
    }

    findByUser(userId: number) {
        return this.repo.find({ where: { user: { id: userId } } });
    }

    update(id: number, data: Partial<CreateGoalDto>) {
        const { userId, ...rest } = data;
        const updateData = {
            ...rest,
            user: { id: userId },
        };
        return this.repo.update(id, updateData).then(() => this.repo.findOneBy({ id }));
    }

    remove(id: number) {
        return this.repo.delete(id);
    }

    async applyIncomeToGoal(userId: number, incomeAmount: number) {
        const goals = await this.repo.find({ where: { user: { id: userId } } });

        for (const goal of goals) {
            const remain = goal.amountTarget - goal.currentAmount;

            if (remain > 0) {
                const toAdd = Math.min(remain, incomeAmount);
                goal.currentAmount = Number(goal.currentAmount) + Number(toAdd);
                incomeAmount = Number(incomeAmount) - Number(toAdd);

                await this.repo.save(goal);
            }

            if (incomeAmount <= 0) break;
        }

        return { message: 'Updated goals with new income' };
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class GoalsService {
    constructor(@InjectRepository(Goal) private repo: Repository<Goal>) { }

    create(data: Partial<Goal>) {
        return this.repo.save(this.repo.create(data));
    }

    findAll() {
        return this.repo.find({ relations: ['user'] });
    }

    findByUser(userId: number) {
        return this.repo.find({ where: { user: { id: userId } } });
    }

    update(id: number, data: Partial<Goal>) {
        return this.repo.update(id, data);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}

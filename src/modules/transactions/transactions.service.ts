import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
    constructor(@InjectRepository(Transaction) private repo: Repository<Transaction>) { }

    create(data: Partial<Transaction>) {
        return this.repo.save(this.repo.create(data));
    }

    findAll() {
        return this.repo.find({ relations: ['user', 'category'] });
    }

    findByUser(userId: number) {
        return this.repo.find({ where: { user: { id: userId } }, relations: ['category'] });
    }

    update(id: number, data: Partial<Transaction>) {
        return this.repo.update(id, data);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}

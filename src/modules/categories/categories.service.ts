import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(@InjectRepository(Category) private repo: Repository<Category>) { }

    create(data: Partial<Category>) {
        return this.repo.save(this.repo.create(data));
    }

    findAll() {
        return this.repo.find({ relations: ['user'] });
    }

    findByUser(userId: number) {
        return this.repo.find({ where: { user: { id: userId } } });
    }

    update(id: number, data: Partial<Category>) {
        return this.repo.update(id, data);
    }

    remove(id: number) {
        return this.repo.delete(id);
    }
}

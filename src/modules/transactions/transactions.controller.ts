import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { TransactionsService } from './transactions.service';
import { Transaction } from 'src/entities';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly service: TransactionsService) { }

    @Post()
    create(@Body() body: Partial<Transaction>) {
        return this.service.create(body);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get('user/:userId')
    findByUser(@Param('userId') userId: string) {
        return this.service.findByUser(+userId);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: Partial<Transaction>) {
        return this.service.update(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}

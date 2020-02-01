import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PaginationArgs } from '@solidary-network/common';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard } from '../auth/guards';
import NewTransactionInput from './dto/new-transaction.input';
import Transaction from './models/transaction.model';
import { TransactionService } from './transaction.service';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) { }

  @Query(returns => Transaction)
  async transactionById(
    @Args('id') id: string,
  ): Promise<Transaction> {
    const transaction = await this.transactionService.findOneById(id);
    if (!transaction) {
      throw new NotFoundException(id);
    }
    return transaction;
  }

  @Query(returns => [Transaction])
  transactions(
    @Args() transactionsArgs: PaginationArgs,
  ): Promise<Transaction[]> {
    return this.transactionService.findAll(transactionsArgs);
  }

  @Mutation(returns => Transaction)
  async transactionNew(
    @Args('newTransactionData') newTransactionData: NewTransactionInput,
  ): Promise<Transaction> {
    const transaction = await this.transactionService.create(newTransactionData);
    // fire subscription
    pubSub.publish('transactionAdded', { transactionAdded: transaction });
    return transaction;
  }

  @Subscription(returns => Transaction)
  transactionAdded() {
    return pubSub.asyncIterator('transactionAdded');
  }

}

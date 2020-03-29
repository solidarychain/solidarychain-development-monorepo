import { NotFoundException, UseGuards, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard } from '../auth/guards';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { NewTransactionInput } from './dto';
import { Transaction } from './models';
import { TransactionService } from './transaction.service';
import { CurrentUser } from '../common/decorators';
import CurrentUserPayload from '../common/types/current-user-payload';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) { }

  @Query(returns => [Transaction])
  transactions(
    @Args() transactionsArgs: PaginationArgs,
  ): Promise<Transaction[]> {
    return this.transactionService.findAll(transactionsArgs);
  }

  @Query(returns => [Transaction])
  transactionComplexQuery(
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() transactionsArgs: PaginationArgs,
  ): Promise<Transaction | Transaction[]> {
    return this.transactionService.findComplexQuery(getByComplexQueryInput, transactionsArgs);
  }

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

  @Mutation(returns => Transaction)
  async transactionNew(
    @CurrentUser() user: CurrentUserPayload,
    @Args('newTransactionData') newTransactionData: NewTransactionInput,
  ): Promise<Transaction> {
    // inject username into newTransactionData
    newTransactionData.loggedPersonId = user.userId;
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

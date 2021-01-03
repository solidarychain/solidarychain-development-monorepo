import { NotFoundException, UseGuards, Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { GqlAuthGuard, GqlRolesGuard } from '../auth/guards';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { NewTransactionInput, UpdateTransactionInput } from './dto';
import { Transaction } from './models';
import { TransactionService } from './transaction.service';
import { CurrentUser, Roles } from '../auth/decorators';
import CurrentUserPayload from '../common/types/current-user-payload';
import { SubscriptionEvent } from '../common/enums';
import { UserInfo, UserRoles } from '@solidary-chain/common-cc';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) { }

  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Transaction])
  transactions(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Transaction[]> {
    return this.transactionService.findAll(paginationArgs);
  }


  // TODO
  @Query(returns => [Transaction])
  transactionComplexQuery(
    @CurrentUser() user: CurrentUserPayload,
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Transaction | Transaction[]> {
    const userInfo: UserInfo = { personId: user.userId, roles: user.roles };
    return this.transactionService.findComplexQuery(getByComplexQueryInput, userInfo, paginationArgs);
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
    pubSub.publish(SubscriptionEvent.transactionAdded, { [SubscriptionEvent.transactionAdded]: transaction });
    return transaction;
  }

  @Mutation(returns => Transaction)
  async transactionUpdate(
    @Args('updateTransactionData') updateTransactionData: UpdateTransactionInput,
  ): Promise<Transaction> {
    const transaction = await this.transactionService.update(updateTransactionData);
    pubSub.publish(SubscriptionEvent.transactionUpdated, { [SubscriptionEvent.transactionUpdated]: transaction });
    return transaction;
  }

  @Subscription(returns => Transaction)
  transactionAdded() {
    return pubSub.asyncIterator(SubscriptionEvent.transactionAdded);
  }

  @Subscription(returns => Transaction)
  transactionUpdated() {
    return pubSub.asyncIterator(SubscriptionEvent.transactionUpdated);
  }
}

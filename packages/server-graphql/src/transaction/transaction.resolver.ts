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
import { UserRoles } from '@solidary-chain/common-cc';

const pubSub = new PubSub();

@UseGuards(GqlAuthGuard)
@Resolver(of => Transaction)
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) { }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Transaction])
  transactions(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Transaction | Transaction[]> {
    return this.transactionService.findAll(paginationArgs, user);
  }


  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => [Transaction])
  transactionComplexQuery(
    @Args('getByComplexQueryInput') getByComplexQueryInput: GetByComplexQueryInput,
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Transaction | Transaction[]> {
    return this.transactionService.findComplexQuery(getByComplexQueryInput, paginationArgs, user);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Query(returns => Transaction)
  async transactionById(
    @Args('id') id: string,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Transaction> {
    const transaction = await this.transactionService.findOneById(id, user);
    if (!transaction.id) {
      throw new NotFoundException(id);
    }
    return transaction;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Mutation(returns => Transaction)
  async transactionNew(
    @Args('newTransactionData') newTransactionData: NewTransactionInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Transaction> {
    // inject username into newTransactionData
    newTransactionData.loggedPersonId = user.userId;
    const transaction = await this.transactionService.create(newTransactionData, user);
    pubSub.publish(SubscriptionEvent.transactionAdded, { [SubscriptionEvent.transactionAdded]: transaction });
    return transaction;
  }

  @Roles(UserRoles.ROLE_ADMIN)
  @UseGuards(GqlRolesGuard)
  @Mutation(returns => Transaction)
  async transactionUpdate(
    @Args('updateTransactionData') updateTransactionData: UpdateTransactionInput,
    @CurrentUser() user: CurrentUserPayload,
  ): Promise<Transaction> {
    const transaction = await this.transactionService.update(updateTransactionData, user);
    pubSub.publish(SubscriptionEvent.transactionUpdated, { [SubscriptionEvent.transactionUpdated]: transaction });
    return transaction;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Subscription(returns => Transaction)
  transactionAdded(
    @CurrentUser() user: CurrentUserPayload,    
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.transactionAdded);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Subscription(returns => Transaction)
  transactionUpdated(
    @CurrentUser() user: CurrentUserPayload,    
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.transactionUpdated);
  }
}

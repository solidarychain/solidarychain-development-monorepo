import { Injectable, Logger } from '@nestjs/common';
import { GoodsInput as GoodsInputConvectorModel } from '@solidary-chain/common-cc';
import { Transaction as TransactionConvectorModel } from '@solidary-chain/transaction-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { v4 as uuid } from 'uuid';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import CurrentUserPayload from '../common/types/current-user-payload';
import { TransactionControllerBackEnd } from '../convector';
import { GoodsInput, NewTransactionInput, UpdateTransactionInput } from './dto';
import { Transaction } from './models';

@Injectable()
export class TransactionService {
  async create(data: NewTransactionInput, user: CurrentUserPayload): Promise<Transaction> {
    try {
      // require to use or generate new id
      const newId: string = (data.id) ? data.id : uuid();
      // init convector model goods, map input to convectorModel input
      // and add if not sent by user, some generated uuid's to goods items, in case we need to create new items in goodsStock arrays, this way we send preGenerated uuid's from graphql
      // require to use ?, data.goods can be undefined
      const goodsInput: GoodsInputConvectorModel[] = data.goods?.map((e: GoodsInput) => ({
        ...e,
        id: (e.id) ? e.id : uuid(),
      }));
      // compose ConvectorModel from NewInput
      const transactionToCreate: TransactionConvectorModel = new TransactionConvectorModel({
        ...data,
        // require to assign undefined to goods, we use goods and not goodsInput to be more intuitive to graphql user, this way he uses goods property
        goods: undefined,
        // convector model goods: now we can pass goods input
        goodsInput,
        // require to inject values
        id: newId,
      });
      await TransactionControllerBackEnd.create(transactionToCreate, user);
      return this.findOneById(newId, user);
    } catch (error) {
      throw error;
    }
  }

  async update(data: UpdateTransactionInput, user: CurrentUserPayload): Promise<Transaction> {
    try {
      // compose ConvectorModel from UpdateInput
      const transactionToUpdate: TransactionConvectorModel = new TransactionConvectorModel({
        ...data
      });
      await TransactionControllerBackEnd.update(transactionToUpdate, user);
      return this.findOneById(data.id, user);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<Transaction | Transaction[]> {
    // get fabric model with _props
    const fabricModel: Array<FlatConvectorModel<TransactionConvectorModel>> = await TransactionControllerBackEnd.getAll(user) as TransactionConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: TransactionConvectorModel[] = fabricModel.map((e: TransactionConvectorModel) => new TransactionConvectorModel(e));
    // call common find method
    const model: Transaction[] = await this.findBy(convectorModel, paginationArgs) as Transaction[];
    // return model
    return model;
  }

  async findComplexQuery(getByComplexQueryInput: GetByComplexQueryInput, paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<Transaction | Transaction[]> {
    // get fabric model with _props
    const fabricModel: Array<FlatConvectorModel<TransactionConvectorModel>> = await TransactionControllerBackEnd.getComplexQuery(getByComplexQueryInput, user) as TransactionConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: TransactionConvectorModel[] = fabricModel.map((e: TransactionConvectorModel) => new TransactionConvectorModel(e));
    // call common find method
    const model: Transaction[] = await this.findBy(convectorModel, paginationArgs) as Transaction[];
    // return model
    return model;
  }

  async findOneById(id: string, user: CurrentUserPayload): Promise<Transaction> {
    // get fabric model with _props
    const fabricModel: TransactionConvectorModel = await TransactionControllerBackEnd.get(id, user);
    // convert fabric model to convector model (remove _props)
    const convectorModel: TransactionConvectorModel = new TransactionConvectorModel(fabricModel);
    // trick: must return convector model as a graphql model, to prevent property conversion problems
    const model: Transaction = await this.findBy(convectorModel, null) as Transaction;
    return model;
  }

  /**
   * shared findBy method
   */
  async findBy(convectorModel: TransactionConvectorModel | TransactionConvectorModel[], paginationArgs: PaginationArgs): Promise<Transaction | Transaction[]> {
    try {
      // working in array mode
      if (Array.isArray(convectorModel)) {
        // require to map fabric model to graphql Transaction[]
        return (paginationArgs)
          ? convectorModel.splice(paginationArgs.skip, paginationArgs.take) as unknown as Transaction[]
          : convectorModel as unknown as Transaction[];
      } else {
        // only convert attributes if have attributes array
        // require to map fabric model to graphql Transaction[]
        return convectorModel as unknown as Transaction;
      }
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

}

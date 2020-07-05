import { Injectable, Logger } from '@nestjs/common';
import { Transaction as TransactionConvectorModel } from '@solidary-chain/transaction-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { v4 as uuid } from 'uuid';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { TransactionControllerBackEnd } from '../convector';
import { NewTransactionInput, GoodsInput } from './dto';
import { Transaction } from './models';
import { GoodsInput as GoodsInputConvectorModel } from '@solidary-chain/common-cc';

@Injectable()
export class TransactionService {
  async create(data: NewTransactionInput): Promise<Transaction> {
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
      await TransactionControllerBackEnd.create(transactionToCreate);
      return this.findOneById(newId);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Transaction[]> {
    try {
      const convectorModel: Array<FlatConvectorModel<TransactionConvectorModel[]>> = await TransactionControllerBackEnd.getAll();
      // require to map fabric model to graphql Transaction[]
      return (paginationArgs)
        ? convectorModel.splice(paginationArgs.skip, paginationArgs.take) as Transaction[]
        : convectorModel as Transaction[];
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw error;
    }
  }

  async findComplexQuery(getByComplexQueryInput: GetByComplexQueryInput, transactionArgs: PaginationArgs): Promise<Transaction | Transaction[]> {
    // get fabric model with _props
    const fabricModel: Array<FlatConvectorModel<TransactionConvectorModel>> = await TransactionControllerBackEnd.getComplexQuery(getByComplexQueryInput) as TransactionConvectorModel[];
    // convert fabric model to convector model (remove _props)
    const convectorModel: TransactionConvectorModel[] = fabricModel.map((e: TransactionConvectorModel) => new TransactionConvectorModel(e));
    // call common find method
    const model: Transaction[] = await this.findBy(convectorModel, transactionArgs) as Transaction[];
    // return model
    return model;
  }

  async findOneById(id: string): Promise<Transaction> {
    // get fabric model with _props
    const fabricModel: TransactionConvectorModel = await TransactionControllerBackEnd.get(id);
    // convert fabric model to convector model (remove _props)
    const convectorModel: TransactionConvectorModel = new TransactionConvectorModel(fabricModel);
    // trick: must return convector model as a graphql model, to prevent property conversion problems
    const model: Transaction = await this.findBy(convectorModel, null) as Transaction;
    return model;
  }

  /**
   * shared findBy method
   */
  async findBy(convectorModel: TransactionConvectorModel | TransactionConvectorModel[], transactionArgs: PaginationArgs): Promise<Transaction | Transaction[]> {
    try {
      // working in array mode
      if (Array.isArray(convectorModel)) {
        // require to map fabric model to graphql Transaction[]
        return (transactionArgs)
          ? convectorModel.splice(transactionArgs.skip, transactionArgs.take) as unknown as Transaction[]
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

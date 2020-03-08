import { Injectable, Logger } from '@nestjs/common';
import { Transaction as TransactionConvectorModel } from '@solidary-network/transaction-cc';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { v4 as uuid } from 'uuid';
import { GetByComplexQueryInput, PaginationArgs } from '../common/dto';
import { TransactionControllerBackEnd } from '../convector';
import { NewTransactionInput } from './dto';
import { Transaction } from './models';

@Injectable()
export class TransactionService {
  async create(data: NewTransactionInput): Promise<Transaction> {
    try {
      // compose ConvectorModel from NewInput
      const transactionToCreate: TransactionConvectorModel = new TransactionConvectorModel({
        ...data,
        // require to inject values
        id: data.id ? data.id : uuid(),
        // convert Date to epoch unix time to be stored in convector transaction model
        createdDate: ((new Date().getTime()) as number),
      });

      await TransactionControllerBackEnd.create(transactionToCreate);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }

  async findAll(paginationArgs: PaginationArgs): Promise<Transaction[]> {
    try {
      const convectorModel: Array<FlatConvectorModel<TransactionConvectorModel>> = await TransactionControllerBackEnd.getAll();
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
    try {
      // get fabric model with _props
      const fabricModel: TransactionConvectorModel = await TransactionControllerBackEnd.get(id) as TransactionConvectorModel;
      // convert fabric model to convector model (remove _props)
      const convectorModel = new TransactionConvectorModel(fabricModel).toJSON();
      // trick: must return convector model as a graphql model, to prevent property conversion problems
      return (convectorModel as Transaction);
    } catch (error) {
      throw error;
    }
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

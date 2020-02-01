import { v4 as uuid } from 'uuid';
import { Transaction as TransactionConvectorModel } from '@solidary-network/transaction-cc';
import { Injectable, Logger } from '@nestjs/common';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { TransactionControllerBackEnd } from '../convector';
import NewTransactionInput from './dto/new-transaction.input';
import { PaginationArgs } from '@solidary-network/common';
import Transaction from './models/transaction.model';

@Injectable()
export class TransactionService {
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

  async create(data: NewTransactionInput): Promise<Transaction> {
    try {
      // compose ConvectorModel from NewInput
      const transactionToCreate: TransactionConvectorModel = new TransactionConvectorModel({
        ...data,
        // require to inject values
        id: data.id ? data.id : uuid(),
        // convert Date to epoch unix time to be stored in convector transaction model
        created: ((new Date().getTime()) as number),
      });

      await TransactionControllerBackEnd.create(transactionToCreate);
      return this.findOneById(data.id);
    } catch (error) {
      throw error;
    }
  }
}

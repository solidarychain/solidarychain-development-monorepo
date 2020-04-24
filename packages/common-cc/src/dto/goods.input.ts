import { Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';

export class GoodsInput  {
  @Required()
  @Validate(yup.string())
  public id: string;

  @Required()
  @Validate(yup.string())
  public code: string;

  @Validate(yup.string())
  public barCode: string;

  @Required()
  @Validate(yup.string())
  public name: string;

  @Validate(yup.string())
  public description: string;

  @Required()
  @Validate(yup.number())
  public quantity?: number;

  @Validate(yup.array().of(yup.string()))
  public tags: string[];

  @Validate(yup.object().nullable())
  public metaData: any;

  @Validate(yup.object().nullable())
  public metaDataInternal: any;
}

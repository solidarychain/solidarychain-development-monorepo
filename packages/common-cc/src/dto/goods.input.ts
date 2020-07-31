import { Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';

export class GoodsInput  {
  @Required()
  @Validate(yup.string())
  id: string;

  @Required()
  @Validate(yup.string())
  code: string;

  @Validate(yup.string())
  barCode: string;

  @Required()
  @Validate(yup.string())
  name: string;

  @Validate(yup.string())
  description: string;

  @Required()
  @Validate(yup.number())
  quantity?: number;

  @Validate(yup.array().of(yup.string()))
  tags: string[];

  @Validate(yup.object().nullable())
  metaData: any;

  @Validate(yup.object().nullable())
  metaDataInternal: any;
}

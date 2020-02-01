import { x509Identities } from '../../common/models/x509Identities.model';
import { Entity } from '@solidary-network/transaction-cc';
import { Validate } from '@worldsibu/convector-core';
import { IsDefined } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import EntityResult from '../../common/models/entity-result.model';
import Participant from '../../participant/models/participant.model';

@ObjectType()
export default class Cause {
  @Field(type => ID)
  id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus input and output type, and new-x-input don't have participant, identities and created

  @Field()
  @IsDefined()
  name: string;

  @Validate(yup.number())
  public startDate: number;

  @Validate(yup.number())
  public endDate: number;

  @Field()
  @IsDefined()
  location: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  metaData: any;

  @Field(type => EntityResult)
  @IsDefined()
  input?: Entity;

  @Field()
  @IsDefined()
  public participant: Participant;

  @Field(type => [x509Identities])
  @IsDefined()
  public identities: x509Identities[];

  @Field()
  @IsDefined()
  @Validate(yup.number())
  public created: number;

}

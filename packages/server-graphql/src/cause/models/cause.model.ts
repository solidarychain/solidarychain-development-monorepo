import { Entity } from '@solidary-network/transaction-cc';
import { IsDefined, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { EntityResult, x509Identities } from '../../common/models';
import { Participant } from '../../participant/models/participant.model';

@ObjectType()
export class Cause {
  @Field(type => ID)
  public id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus input and output type, and new-x-input don't have participant, identities and createdDate

  @Field()
  @IsDefined()
  public name: string;

  @Field({ nullable: true })
  // @Validate(yup.number())
  @Validate(yup.number)
  public startDate: number;

  @Field({ nullable: true })
  // @Validate(yup.number())
  @Validate(yup.number)
  public endDate: number;

  @Field({ nullable: true })
  @IsDefined()
  public location: string;

  // TODO: tags
  @Field(type => String, { nullable: true })
  public tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsDefined()
  public metaData: any;

  @Field(type => EntityResult)
  @IsDefined()
  public input?: Entity;

  @Field()
  @IsDefined()
  public participant: Participant;

  @Field(type => [x509Identities])
  @IsDefined()
  public identities: x509Identities[];

  @Field()
  @IsDefined()
  // @Validate(yup.number())
  @Validate(yup.number)
  public createdDate: number;

}

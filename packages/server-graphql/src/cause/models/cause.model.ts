import { Entity } from '@solidary-network/transaction-cc';
import { IsDefined, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from 'type-graphql';
import * as yup from 'yup';
import { EntityResult, x509Identities } from '../../common/models';
import { Participant } from '../../participant/models/participant.model';
import { Optional } from '@nestjs/common';

@ObjectType()
export class Cause {
  @Field(type => ID)
  public id: string;

  // above is equal dto/new-x.input.ts and models/x.model.ts
  // minus startDate, endDate, participant, identities and createdDate

  @Field()
  @IsDefined()
  public name: string;

  @Field(type => String, { nullable: true })
  @Optional()
  public ambassadors: string[];

  @Field({ nullable: true })
  @Optional()
  @Validate(yup.number)
  public startDate: number;

  @Field({ nullable: true })
  @Optional()
  @Validate(yup.number)
  public endDate: number;

  @Field({ nullable: true })
  @Optional()
  @IsDefined()
  public location: string;

  @Field(type => String, { nullable: true })
  @Optional()
  public tags: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  public metaData: any;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @Optional()
  public metaDataInternal: any;

  // WARN different from model, must be a GraphQLJSONObject in input and EntityResult in model
  @Field(type => EntityResult)
  @Optional()
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
  @Validate(yup.number)
  public createdDate: number;

}

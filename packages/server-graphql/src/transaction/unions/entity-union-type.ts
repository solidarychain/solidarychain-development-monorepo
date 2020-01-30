// https://typegraphql.ml/docs/unions.html

import { createUnionType, Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
class Movie {
  @Field()
  name: string;

  @Field()
  rating: number;
}

// tslint:disable-next-line: max-classes-per-file
@ObjectType()
class Actor {
  @Field()
  name: string;

  @Field(type => Int)
  age: number;
}

export const SearchResult = createUnionType({
  name: 'SearchResult',
  types: () => [Movie, Actor],
});

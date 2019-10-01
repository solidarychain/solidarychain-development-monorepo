import * as React from 'react';
import { Loading, ErrorMessage } from '../components';
import { Person, usePersonsQuery } from '../generated/graphql';

interface Props { }

export const Home: React.FC<Props> = () => {
  // hooks
  const { data, loading, error } = usePersonsQuery({
    fetchPolicy: 'network-only',
    variables: {
      skip: 0,
      take: 50
    }
  });

  // catch error first
  if (error) {
    return <ErrorMessage error={error.message} />;
  }

  if (loading || !data) {
    return <Loading />
  }

  return (
    <div>
      <h2>Home</h2>
      <ul>
        {data.persons.map((e: Person) =>
          <li key={e.id}>{e.id}, {e.firstname}, {e.lastname}, {e.email}, {e.username}</li>
        )}
      </ul>
    </div>
  );
}
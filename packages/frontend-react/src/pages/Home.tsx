import * as React from 'react'
import { usePersonsQuery, Person } from '../generated/graphql'

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
    return <pre>{JSON.stringify(error, undefined, 2)}</pre>
  }

  if (loading || !data) {
    return <div>loading...</div>
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
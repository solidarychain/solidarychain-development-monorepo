import * as React from 'react'
import { usePersonsQuery, Person } from '../generated/graphql'

interface Props { }

export const Home: React.FC<Props> = () => {
  // hooks
  const { data, loading, error } = usePersonsQuery();

  // catch error first
  if (error) {
    return <pre>{JSON.stringify(error, undefined, 2)}</pre>
  }

  if (loading || !data) {
    return <div>loading...</div>
  }

  return (
    <div>
      {data.persons.map((e: Person) =>
        <ul>
          <li>{e.id}, {e.firstname}, {e.lastname}, {e.email}, {e.username}</li>
        </ul>
      )}
    </div>
  );
}
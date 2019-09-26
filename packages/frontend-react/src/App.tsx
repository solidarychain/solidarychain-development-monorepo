import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const App: React.FC = () => {
  const { data, loading, error } = useQuery(gql`
    query ($id: String!){
      participantById(id:$id)
      {
        id
        name
        msp,
        identities{
          id
          status
          fingerprint
        }
      }
    }
  `, {
    variables: {
      'id': 'gov'
    },
  })

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <pre>{JSON.stringify(error, undefined, 2)}</pre>
  }

  return (
    <pre>{JSON.stringify(data, undefined, 2)}</pre>
  );
}

export default App;

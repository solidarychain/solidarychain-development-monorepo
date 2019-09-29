import React from 'react';
// import { useQuery } from '@apollo/react-hooks';
// import { gql } from 'apollo-boost';
import { useParticipantByIdQuery } from './generated/graphql';

const App: React.FC = () => {
  // old query without graphql-codegen useQuery
  // const { data, loading, error } = useQuery(gql`
  //   query ($id: String!){
  //     participantById(id:$id)
  //     {
  //       id
  //       name
  //       msp,
  //       identities{
  //         id
  //         status
  //         fingerprint
  //       }
  //     }
  //   }
  // `, {
  //   variables: {
  //     'id': 'gov'
  //   },
  // })

  // with graphql-codegen generated useQuery
  const { data, loading, error } = useParticipantByIdQuery({
    variables: {
      'id': 'gov'
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
    <pre>{JSON.stringify(data.participantById, undefined, 2)}</pre>
  );
}

export default App;

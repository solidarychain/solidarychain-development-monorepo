import * as React from 'react';
import { ErrorMessage, Loading } from '../components';
import { envVariables as e } from '../env';
import { usePersonProfileQuery } from '../generated/graphql';

interface Props { }

export const Profile: React.FC<Props> = () => {
  const { data, loading, error } = usePersonProfileQuery({
    fetchPolicy: e.apolloFetchPolicy
  });

  if (error) {
    console.log(error);
    return <ErrorMessage error={error.message} />;
  }

  if (loading || !data) {
    return <Loading />
  }

  const { personProfile } = data;
  return (
    <pre>{JSON.stringify(personProfile, undefined, 2)}</pre>
  );
}
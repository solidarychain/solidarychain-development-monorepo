import * as React from 'react';
import { Loading, ErrorMessage } from '../components';
import { usePersonProfileQuery } from '../generated/graphql';

interface Props { }

export const Profile: React.FC<Props> = () => {
  const { data, loading, error } = usePersonProfileQuery();

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
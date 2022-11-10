import React from 'react';
import { useGetUsersQuery } from 'gql/graphql';

type Props = {};

function Home({}: Props) {
  const { data, loading } = useGetUsersQuery();

  console.log(data);

  return <div>Home</div>;
}

export default Home;

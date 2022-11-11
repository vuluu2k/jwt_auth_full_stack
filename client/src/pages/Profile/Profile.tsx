import React from 'react';

import { useHelloQuery } from 'gql/graphql';

function Profile() {
  const { data, loading } = useHelloQuery({ fetchPolicy: 'no-cache' });

  console.log(data);

  if (loading) return <h3>Đang tải...</h3>;

  return <h3>{data?.hello}</h3>;
}

export default Profile;

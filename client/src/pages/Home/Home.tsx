import React from 'react';
import { useGetUsersQuery } from 'gql/graphql';

function Home() {
  const { data = {}, loading } = useGetUsersQuery({ fetchPolicy: 'no-cache' });

  if (loading) return <h1>Đang tải...</h1>;

  const { users = [] } = data as any;

  console.log(users);

  return (
    <div style={{ display: 'flex' }}>
      <ul>
        {users.map((item: any, index: number) => {
          return <li key={index}>{item.username}</li>;
        })}
      </ul>
    </div>
  );
}

export default Home;

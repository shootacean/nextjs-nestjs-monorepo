import type { NextPage, GetServerSideProps } from 'next';
import { useState } from 'react';
import { Configuration } from '@/client/runtime';
import { User } from '@/client/models/User';
import { UsersApi, CreateRequest } from '@/client/apis/UsersApi';

const UsersPage: NextPage = ({ users }) => {
  const [userName, setUserName] = useState('');

  const handleCreateUser = async () => {
    const client = new UsersApi(
      new Configuration({
        basePath: 'http://localhost:3001',
      }),
    );
    await client.create({
      createUserDto: {
        name: userName,
      },
    });
    setUserName('');
  };

  return (
    <>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{(user.id, user.name)}</li>
        ))}
      </ul>
      <input
        type='text'
        name='name'
        placeholder='user name'
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <button type='submit' onClick={handleCreateUser}>
        Create
      </button>
    </>
  );
};

export default UsersPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const client = new UsersApi(
    new Configuration({
      basePath: 'http://localhost:3001',
    }),
  );
  const users: User[] = await client.findAll();
  return {
    props: {
      users: users,
    },
  };
};

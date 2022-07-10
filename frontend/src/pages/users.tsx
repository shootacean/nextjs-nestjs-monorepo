import type { NextPage, GetServerSideProps } from 'next';

type User = { id: number; name: string };

const UsersPage: NextPage = ({ users }) => {
  return (
    <>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{(user.id, user.name)}</li>
        ))}
      </ul>
    </>
  );
};

export default UsersPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch('http://localhost:3001/users');
  const data = await res.json();
  return {
    props: {
      users: data,
    },
  };
};

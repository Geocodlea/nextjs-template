import dbConnect from "/utils/dbConnect";
import User from "/models/User";

const Users = async () => {
  await dbConnect();
  const users = await User.find();

  return (
    <>
      {users.map((user) => (
        <p key={user.id}>{user.email}</p>
      ))}
    </>
  );
};

export default Users;

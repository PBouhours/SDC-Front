import axios from '../../../axios-order';
import { useEffect, useState } from 'react';
import UserItem from '../molecules/UserItem';

function UserItemList() {
  const [users, SetUsers] = useState([]);

  function getItems() {
    axios.get('/users').then((response) => {
      SetUsers(response.data);
    });
  }

  useEffect(() => {
    getItems();
  }, []);
  console.log(users);
  return (
    <div className="flex flex-col items-center">
      {users.map((el) => (
        <UserItem key={el.id} {...el} refresh={getItems} />
      ))}
    </div>
  );
}

export default UserItemList;

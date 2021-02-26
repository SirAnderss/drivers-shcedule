import React, { useContext, useEffect } from 'react';
import DeliverContext from '../context/deliver/DeliverContext';
import getHours from '../resources/getHours';
import { v4 as uuidv4 } from 'uuid';

import H1 from './H1';
import UserList from './UserList';

function Schedule() {
  const times = getHours('08:00:00', '20:00:00');
  const {
    getUsers,
    users,
    userKeys,
    keyTask,
    setTaskkey,
    selected,
    setSelected,
    getBusyUsers,
  } = useContext(DeliverContext);

  const handleTask = (key) => {
    const filteredUsers = filterUsers(key);

    if (filteredUsers.length === users.length) {
      setTaskkey(key);
      getBusyUsers(true);
      setSelected(true);
    } else {
      setSelected(true);
      setTaskkey(key);
    }
  };

  const filterUsers = (key) => {
    const res = userKeys.reduce((acc, el) => {
      if (el === key) {
        acc.push(el);
      }

      return acc;
    }, []);

    return res;
  };

  const handleColor = (key) => {
    const filteredUsers = filterUsers(key);

    const color = userKeys.includes(key)
      ? filteredUsers.length === users.length
        ? 'bg-red-600 border-red-700'
        : 'bg-green-600 border-green-700'
      : keyTask
      ? key === keyTask
        ? 'bg-purple-600 border-purple-700'
        : 'bg-blue-400 border-blue-500'
      : 'bg-blue-400 border-blue-500';

    return color;
  };

  const mountAvatars = (item, key) => {
    const userAvatar = item.segment.map((el, index) =>
      el === key ? (
        <div
          key={index}
          className="flex justify-start items-center mr-1 object-fill rounded-full"
        >
          <img className="h-5" src={item.avatar} alt={item.name} />
        </div>
      ) : null
    );

    return userAvatar;
  };

  useEffect(() => {
    const saveToken = () => {
      if (!localStorage.getItem('userToken')) {
        localStorage.setItem('userToken', btoa(uuidv4()));
      }
    };

    getUsers();
    saveToken();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {!selected ? (
        users.length > 0 ? (
          <>
            <H1>Schedule</H1>
            <div className="max-w-xs flex flex-col">
              {times.map((item, key) => (
                <div
                  key={key}
                  onClick={() => handleTask(key + 1)}
                  className={`relative w-72 my-2 py-2 text-center text-lg text-white font-semibold rounded-lg border shadow-xl cursor-pointer transition hover:scale-105 duration-300 delay-150 ${handleColor(
                    key + 1
                  )}`}
                >
                  {item}
                  <div className="absolute flex -bottom-1 -right-1 cursor-default">
                    {userKeys.includes(key + 1)
                      ? users.map((item, index) => (
                          <div key={index}>{mountAvatars(item, key + 1)}</div>
                        ))
                      : null}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          'Loading'
        )
      ) : (
        <UserList />
      )}
    </div>
  );
}

export default Schedule;

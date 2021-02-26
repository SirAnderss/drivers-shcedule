import React, { useContext, useEffect } from 'react';
import DeliverContext from '../context/deliver/DeliverContext';
import getHours from '../resources/getHours';
import { v4 as uuidv4 } from 'uuid';

import H1 from './H1';
import UserList from './UserList';
import { Loader } from './Loader';

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
        ? 'bg-red-400 border-red-500 hover:bg-red-500 hover:border-red-600'
        : 'bg-green-400 border-green-500 hover:bg-green-500 hover:border-green-600'
      : keyTask
      ? key === keyTask
        ? 'bg-purple-400 border-purple-500 hover:bg-purple-500 hover:border-purple-600'
        : 'bg-blue-400 border-blue-500 hover:bg-blue-500 hover:border-blue-600'
      : 'bg-blue-400 border-blue-500 hover:bg-blue-500 hover:border-blue-600';

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
    <>
      {!selected ? (
        users.length > 0 ? (
          <div className="md:absolute top-1/2 transform md:-translate-y-1/2">
            <H1>Schedule</H1>
            <p className="text-center text-lg font-medium text-gray-700 py-2">
              Select your time segment...
            </p>
            <div className="w-11/12 mx-auto flex flex-col items-center md:max-h-screen md:justify-center md:flex-row md:flex-wrap">
              {times.map((item, key) => (
                <div
                  key={key}
                  onClick={() => handleTask(key + 1)}
                  className={`relative w-72 m-2 py-2 text-center text-lg text-white font-semibold rounded-lg border shadow-xl cursor-pointer transform transition hover:scale-105 duration-300 delay-150 ${handleColor(
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
          </div>
        ) : (
          <Loader />
        )
      ) : (
        <UserList />
      )}
    </>
  );
}

export default Schedule;

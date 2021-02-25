import React, { useContext, useEffect, useState } from 'react';
import DeliverContext from '../context/deliver/DeliverContext';
import User from './User';
import H1 from './H1';

function UserList() {
  const { users, keyTask } = useContext(DeliverContext);
  const [freeDrivers, setFreeDrivers] = useState([]);

  const getFreeDrivers = () => {
    let arr = [];
    users.forEach((el) => {
      if (!el.segment.includes(keyTask)) {
        arr.push(el);
      }
    });

    setFreeDrivers(arr);
  };

  useEffect(() => {
    getFreeDrivers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full h-screen flex justify-around items-center">
      <div className="w-1/2 h-auto ">
        {freeDrivers.length > 0 ? (
          <>
            <H1>Select your driver</H1>
            <div className="flex flex-wrap">
              {freeDrivers.map((item, key) => (
                <div key={key}>
                  <User user={item} index={key} />
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserList;

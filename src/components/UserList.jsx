import React, { useContext, useEffect, useState } from 'react';
import DeliverContext from '../context/deliver/DeliverContext';
import User from './User';
import H1 from './H1';

function UserList() {
  const { users, keyTask, setUser } = useContext(DeliverContext);
  const [freeDrivers, setFreeDrivers] = useState([]);
  const [busyDrivers, setBusyDrivers] = useState([]);

  const getDrivers = () => {
    let free = [];
    let busy = [];
    users.forEach((el) => {
      if (!el.segment.includes(keyTask)) {
        free.push(el);
      }
      setFreeDrivers(free);

      if (el.segment.includes(keyTask)) {
        busy.push(el);
      }
      setBusyDrivers(busy);
    });
  };

  const saveDriver = (driver) => setUser(driver, 'save');
  const removeDriver = (driver) => setUser(driver, 'remove');

  useEffect(() => {
    getDrivers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full h-screen flex justify-around items-center">
      <div className="w-1/2 h-auto ">
        {freeDrivers.length > 0 ? (
          <>
            <H1>Select your driver to save</H1>
            <div className="flex flex-wrap">
              {freeDrivers.map((item, key) => (
                <div key={key}>
                  <User
                    user={item}
                    index={key}
                    action={'save'}
                    saveDriver={saveDriver}
                  />
                </div>
              ))}
            </div>
          </>
        ) : null}
        {busyDrivers.length > 0 ? (
          <>
            <H1>Select your driver to remove</H1>
            <div className="flex flex-wrap">
              {busyDrivers.map((item, key) => (
                <div key={key}>
                  <User
                    user={item}
                    index={key}
                    action={'remove'}
                    removeDriver={removeDriver}
                  />
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

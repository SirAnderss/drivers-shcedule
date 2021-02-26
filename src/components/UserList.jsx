import React, { useContext, useEffect, useState } from 'react';
import DeliverContext from '../context/deliver/DeliverContext';
import User from './User';
import H1 from './H1';
import { Loader } from './Loader';

function UserList() {
  const localUser = atob(localStorage.getItem('userToken'));
  const { users, keyTask, setUser, setTaskkey, setSelected } = useContext(
    DeliverContext
  );
  const [freeDrivers, setFreeDrivers] = useState([]);
  const [busyDrivers, setBusyDrivers] = useState([]);
  const [saving, setSaving] = useState(false);

  const getDrivers = () => {
    let free = [];
    let busy = [];

    users.forEach((el) => {
      if (!el.segment.includes(keyTask)) {
        free.push(el);
      }
      setFreeDrivers(free);

      if (el.segment.includes(keyTask)) {
        el.takenFor.forEach((item) => {
          if (item === localUser) {
            busy.push(el);
          }
        });
      }
      setBusyDrivers(busy);
    });
  };

  const handleClose = () => {
    setTaskkey(null);
    setSelected(false);
  };

  const saveDriver = (driver) =>
    setUser(driver, 'save').then(() => setSaving(true));
  const removeDriver = (driver) =>
    setUser(driver, 'remove').then(() => setSaving(true));

  useEffect(() => {
    getDrivers();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {saving ? (
        <Loader />
      ) : (
        <div className="w-11/12 mx-auto">
          <p
            onClick={() => handleClose()}
            className="fixed right-6 top-4 p-2 cursor-pointer rounded-full transition duration-200 hover:shadow-md hover:bg-red-500"
          >
            ✖️
          </p>
          <div className="px-4 transform md:absolute left-1/2 top-1/2 md:-translate-y-1/2  md:-translate-x-1/2">
            {freeDrivers.length > 0 ? (
              <>
                <H1>Select your driver to save</H1>
                <div className="w-full flex flex-col items-center justify-center mt-3 md:w-5/6 mx-auto md:flex-row md:flex-wrap">
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
              <div className="mt-6">
                <H1>Select your driver to remove</H1>
                <div className="w-full flex flex-col items-center justify-center mt-3 md:w-5/6 mx-auto md:flex-row md:flex-wrap">
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
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default UserList;

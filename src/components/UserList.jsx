import React, { useEffect, useContext } from 'react';
import DeliverContext from '../context/deliver/DeliverContext';
import Schedule from './Schedule';
import User from './User';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

function UserList() {
  const { users, getUsers } = useContext(DeliverContext);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-screen flex justify-around items-center">
      <Schedule />
      <div className="w-1/2 h-screen ">
        {users.length > 0 ? (
          <>
            <h2 className="text-2xl text-gray-600 text-center my-3 uppercase">
              Drivers
            </h2>
            <SimpleBar style={{ maxHeight: '90vh' }}>
              <div className="flex flex-wrap">
                {users.map((item, key) => (
                  <div className="" key={key}>
                    <User user={item} index={key} />
                  </div>
                ))}
              </div>
            </SimpleBar>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default UserList;

import React, { useContext } from 'react';
import DeliverContext from '../context/deliver/DeliverContext';

function User({ user, index }) {
  const { setUser } = useContext(DeliverContext);

  return (
    <>
      <div
        className="flex w-40 h-20 justify-start items-center cursor-pointer m-2"
        onClick={() => setUser(user)}
      >
        <img
          src={user.avatar}
          alt={user.name.toUpperCase()}
          className="w-16 h-16 object-contain rounded-full shadow-lg border-2 bg-gray-50 border-gray-100 transition duration-300 delay-75 hover:scale-105 hover:border-8"
        />
        <p className="ml-2 text-center text-lg font-semibold text-gray-600 uppercase">
          {user.name}
        </p>
      </div>
    </>
  );
}

export default User;

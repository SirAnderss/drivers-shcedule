import React from 'react';

function User({ user, action, removeDriver, saveDriver }) {
  // const { setUser } = useContext(DeliverContext);

  const handleClick = (data) => {
    switch (action) {
      case 'save':
        saveDriver(data);
        break;
      case 'remove':
        removeDriver(data);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div
        className="flex w-40 h-16 md:h-20 md:m-2 justify-start items-center cursor-pointer"
        onClick={() => handleClick(user)}
      >
        <img
          src={user.avatar}
          alt={user.name.toUpperCase()}
          className="w-12 h-12 md:w-20 md:h-20 object-contain rounded-full shadow-lg border-2 bg-gray-50 border-gray-100 transition transform duration-300 delay-75 hover:scale-105 hover:border-8"
        />
        <p className="ml-2 text-center text-lg font-semibold text-gray-600 uppercase">
          {user.name}
        </p>
      </div>
    </>
  );
}

export default User;

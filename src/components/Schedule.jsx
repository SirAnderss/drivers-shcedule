import React from 'react';
import getHours from '../resources/getHours';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

function Schedule() {
  const times = getHours('08:00:00', '20:00:00');

  return (
    <div className="w-1/2 h-screen mt-4">
      <h1 className="text-4xl text-center text-gray-600 my-4 uppercase">
        Schedule
      </h1>
      <SimpleBar style={{ maxHeight: '90vh' }}>
        <div className="max-w-sm flex flex-wrap justify-center ">
          {times.map((item, key) => (
            <div
              key={key}
              className="relative w-20 mx-3 my-2 py-2 bg-blue-400 text-center text-lg text-white font-semibold rounded-lg border border-blue-500 shadow-xl cursor-pointer transition hover:scale-105 duration-300 delay-150"
            >
              {item}
              {/* <div className="absolute bg-white w-5 h-5 rounded-full -bottom-1 -right-1"></div> */}
            </div>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
}

export default Schedule;

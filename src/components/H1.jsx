import React from 'react';
import PropTypes from 'prop-types';

const H1 = (props) => {
  return (
    <h1 className="text-3xl text-gray-600 text-center my-3 uppercase">
      {props.children}
    </h1>
  );
};

H1.propTypes = {
  children: PropTypes.string,
};

export default H1;

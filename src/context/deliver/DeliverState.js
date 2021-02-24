import React, { useReducer } from 'react';
import DeliverReducer from './DeliverReducer';
import DeliverContext from './DeliverContext';
import db from '../../firebase.config';

const DeliverState = (props) => {
  const initialState = {
    users: [],
    user: {},
  };

  const [state, dispatch] = useReducer(DeliverReducer, initialState);

  const getUsers = async () => {
    await db
      .collection('delivers')
      .get()
      .then((query) => {
        let arr = [];

        query.empty
          ? dispatch({
              type: 'GET_USERS',
              payload: [],
            })
          : query.forEach((item) => arr.push(item.data()));

        if (arr.length > 0) {
          dispatch({
            type: 'GET_USERS',
            payload: arr,
          });
        }
      })
      .catch((e) => console.error('error', e));
  };

  return (
    <DeliverContext.Provider
      value={{
        users: state.users,
        user: state.user,
        getUsers,
      }}
    >
      {props.children}
    </DeliverContext.Provider>
  );
};

export default DeliverState;

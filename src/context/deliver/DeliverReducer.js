import { GET_USERS, SET_USER } from '../types';

const DeliverReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };

    case SET_USER:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
};

export default DeliverReducer;

import {
  GET_USERS,
  GET_FREE_USERS,
  GET_BUSY_USERS,
  SET_USER,
  SET_USER_KEYS,
  SET_SELECTED,
  SET_KEYTIME,
} from '../types';

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

    case SET_SELECTED:
      return {
        ...state,
        selected: payload,
      };

    case GET_FREE_USERS:
      return {
        ...state,
        freeUsers: payload,
      };

    case GET_BUSY_USERS:
      return {
        ...state,
        busyUsers: payload,
      };

    case SET_USER_KEYS:
      return {
        ...state,
        userKeys: payload,
      };

    case SET_KEYTIME:
      return {
        ...state,
        keyTask: payload,
      };

    default:
      return state;
  }
};

export default DeliverReducer;

import React, { useReducer } from 'react';
import DeliverReducer from './DeliverReducer';
import DeliverContext from './DeliverContext';
import db from '../../firebase.config';
import migrate from '../../resources/migrations';

const DeliverState = (props) => {
  const initialState = {
    users: [],
    user: {},
    keyTask: null,
    selected: false,
    userKeys: [],
    busy: false,
  };

  const [state, dispatch] = useReducer(DeliverReducer, initialState);

  const getUsers = async () => {
    await db
      .collection('delivers')
      .get()
      .then((query) => {
        setUsers(query);
      })

      .catch((e) => console.error('error', e));
  };

  const setUsers = async (data) => {
    let users = [];
    let keys = [];

    data.empty
      ? migrate()
          .then(() => getUsers())
          .catch((e) => console.error(e))
      : data.forEach((item) => {
          item.data().segment.forEach((item) => keys.push(item));

          users.push(item.data());
        });

    if (users.length > 0) {
      dispatch({
        type: 'GET_USERS',
        payload: users,
      });
      dispatch({
        type: 'SET_USER_KEYS',
        payload: keys,
      });
      dispatch({
        type: 'SET_SELECTED',
        payload: false,
      });
    }
  };

  const getBusyUsers = (val) => {
    dispatch({
      type: 'GET_BUSY_USERS',
      payload: val,
    });
  };

  const setSelected = (val) => {
    dispatch({
      type: 'SET_SELECTED',
      payload: val,
    });
  };

  const setTaskkey = (key) => {
    dispatch({
      type: 'SET_KEYTIME',
      payload: key,
    });
  };

  const removeUserId = (arr, id) => {
    let indexes = null;
    indexes = arr.filter((el) => (el === id ? el : null));

    indexes.pop();

    return indexes;
  };

  const setUser = async (data, action) => {
    const localUser = atob(localStorage.getItem('userToken'));

    switch (action) {
      case 'save':
        data.takenFor.push(localUser);
        data.segment.push(state.keyTask);
        break;

      case 'remove':
        data.segment = data.segment.filter((el) => el !== state.keyTask);
        data.takenFor = removeUserId(data.takenFor, localUser);
        break;

      default:
        break;
    }

    await db
      .collection('delivers')
      .where('name', '==', data.name)
      .get()
      .then((querySnapshot) =>
        querySnapshot.forEach((doc) => saveUser(doc.id, data))
      );
  };

  const saveUser = async (id, data) => {
    const docRef = db.collection('delivers').doc(id);

    await docRef
      .update(data)
      .then(() => getUsers())
      .then(() =>
        dispatch({
          type: 'SET_SELECTED',
          payload: false,
        })
      )
      .then(() =>
        dispatch({
          type: 'SET_KEYTIME',
          payload: null,
        })
      )
      .catch((e) => console.error(e));
  };

  return (
    <DeliverContext.Provider
      value={{
        users: state.users,
        user: state.user,
        selected: state.selected,
        busy: state.busy,
        keyTask: state.keyTask,
        userKeys: state.userKeys,
        getUsers,
        setTaskkey,
        setUser,
        setSelected,
        getBusyUsers,
      }}
    >
      {props.children}
    </DeliverContext.Provider>
  );
};

export default DeliverState;

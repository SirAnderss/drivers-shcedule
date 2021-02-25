import React, { useReducer } from 'react';
import DeliverReducer from './DeliverReducer';
import DeliverContext from './DeliverContext';
import db from '../../firebase.config';
import migrate from '../../resources/migrations';

const DeliverState = (props) => {
  const initialState = {
    users: [],
    freeUsers: [],
    busyUsers: [],
    user: {},
    keyTask: null,
    selected: false,
    userKeys: [],
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

  const setUser = async (data) =>
    await db
      .collection('delivers')
      .where('name', '==', data.name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => saveUser(doc.id, data));
      });

  const saveUser = async (id, data) => {
    const localUser = atob(localStorage.getItem('userToken'));
    const docRef = db.collection('delivers').doc(id);

    data.takenFor.push(localUser);
    data.segment.push(state.keyTask);

    await docRef
      .update(data)
      .then(() => getUsers())
      .then(() =>
        dispatch({
          type: 'SET_SELECTED',
          payload: false,
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
        freeUsers: state.freeUsers,
        busyUsers: state.busyUsers,
        keyTask: state.keyTask,
        userKeys: state.userKeys,
        getUsers,
        setTaskkey,
        setUser,
        setSelected,
      }}
    >
      {props.children}
    </DeliverContext.Provider>
  );
};

export default DeliverState;

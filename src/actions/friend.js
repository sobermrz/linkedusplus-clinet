import axios from 'axios';
import { setAlert } from './alert';

import { ADD_FRIEND, REMOVE_FRIEND } from './types';

export const addFriend = (id, name) => async (dispatch) => {
  try {
    console.log(id);
    const res = await axios.put(`/api/users/friend/${id}`);
    console.log(res.data);
    dispatch({
      type: ADD_FRIEND,
      payload: id,
    });

    dispatch(setAlert(`${name} now is your friend`, 'success', 2000));
  } catch (err) {
    console.log(err);
  }
};

export const removeFriend = (id, name) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/users/unfriend/${id}`);
    console.log(res.data);
    dispatch({
      type: REMOVE_FRIEND,
      payload: id,
    });

    dispatch(
      setAlert(`${name} removeded from your friend list`, 'success', 2000)
    );
  } catch (err) {
    console.log(err);
  }
};

import {
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_FRIENDS_PROFILES,
  ADD_FRIEND,
  REMOVE_FRIEND,
} from '../actions/types';

const initialState = {
  profile: null, //indivisual profile
  profiles: [], //all the profile
  friends: [], //all friends profile
  repos: [], //GitHub Repository
  loading: true, //Need loading?
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_FRIENDS_PROFILES:
      return {
        ...state,
        friends: payload,
        loading: false,
      };
    case ADD_FRIEND:
      return {
        ...state,
        profiles: state.profiles.filter(
          (profile) => profile.user._id !== payload
        ),
        loading: false,
      };
    case REMOVE_FRIEND:
      return {
        ...state,
        friends: state.friends.filter((friend) => friend.user._id !== payload),
        loading: false,
      };

    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: true,
      };
    default:
      return state;
  }
}

import {
  UPDATE_MESSAGE,
  CONNECT_WEBSOCKET,
  DISCONNECT_WEBSOCKET,
  SET_TALKER,
  UPDATE_ALL_MSG_DATA,
} from '../actions/types';

const initialState = {
  socket: null,
  nowTalkingTo: null,
  msgData: [],
  allMsgData: new Map(),
  friend: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // TO DO: 從資料庫取得聊天紀錄後，更新allMsgData state
    case CONNECT_WEBSOCKET:
      return {
        ...state,
        socket: payload,
        loading: false,
      };
    case UPDATE_MESSAGE:
      //const {from} = payload;
      return {
        ...state,
        msgData: [...state.msgData, payload],
        loading: false,
      };
    case UPDATE_ALL_MSG_DATA:
      return {
        ...state,
        allMsgData: payload,
      };
    case SET_TALKER:
      return {
        ...state,
        msgData: payload.msgData,
        nowTalkingTo: payload.userId,
      };

    case DISCONNECT_WEBSOCKET:
      return {
        socket: null,
        nowTalkingTo: null,
        msgData: [],
        allMsgData: new Map(),
        friend: null,
        loading: true,
      };
    default:
      return state;
  }
}

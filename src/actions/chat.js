import webSocket from 'socket.io-client';
import axios from 'axios';
import {
    CONNECT_WEBSOCKET,
    DISCONNECT_WEBSOCKET,
    UPDATE_MESSAGE,
    SET_TALKER,
    UPDATE_ALL_MSG_DATA
} from './types';
import store from '../store';
var webSocketURL = 'http://localhost:8088';
export const setWebSocketURL = url => {
    webSocketURL = url;
};

export const connectWebSocket = userId => async dispatch => {
    try {
        let socketId = '';
        const socket = await webSocket(webSocketURL);

        console.log('waiting for the message...');

        socket.on('connect', () => {
            socketId = socket.id;
            //Send User ID and user webSocket ID
            //之後這裡可以加入toekn，讓server進行驗證，見證通過才讓他進行通訊
            socket.emit('user_login', {
                userId,
                socketId
            });
            console.log('clinet regist to the server');
        });

        await dispatch(getAllMsgData());

        socket.on('getMessage', data => {
            console.log('From: ', data.from, 'Msg: ', data.msg);
            const state = store.getState();
            const nowTalkingTo = state.chat.nowTalkingTo;
            const allMsgData = new Map(state.chat.allMsgData);
            //需要nowTalkingTo，判斷是否等於from，等於就要同時更新msaData和allMsgData

            if (data.from === nowTalkingTo) {
                dispatch({
                    type: UPDATE_MESSAGE,
                    payload: Object.assign({}, data)
                });
            }

            //將msgData添加到對應id的allMsgData
            if (allMsgData.get(data.from)) {
                allMsgData.get(data.from).push(Object.assign({}, data));
            } else {
                allMsgData.set(data.from, [Object.assign({}, data)]);
            }

            dispatch({
                type: UPDATE_ALL_MSG_DATA,
                payload: allMsgData
            });
        });

        //TO DO: 像server 獲取所有連天紀錄，並綁定到allMsgData

        dispatch({ type: CONNECT_WEBSOCKET, payload: socket });
    } catch (error) {
        console.log(error);
    }
};

export const sendMessage = (socket, data) => async dispatch => {
    try {
        socket != null && socket.emit('getMessage', data);
        dispatch({
            type: UPDATE_MESSAGE,
            payload: Object.assign({}, data)
        });
        const state = store.getState();
        const nowTalkingTo = state.chat.nowTalkingTo;
        const allMsgData = new Map(state.chat.allMsgData);

        if (allMsgData.get(nowTalkingTo)) {
            allMsgData.get(nowTalkingTo).push(Object.assign({}, data));
        } else {
            allMsgData.set(nowTalkingTo, [Object.assign({}, data)]);
        }
        dispatch({
            type: UPDATE_ALL_MSG_DATA,
            payload: allMsgData
        });
    } catch (error) {
        console.log(error);
    }
};

//設定要連天的對象，去allMsgData裡拿出對應user id 的聊天資料，並將此資料設定為msgData
export const setTalker = (userId, allMsgData) => async dispatch => {
    const msgData =
        allMsgData && allMsgData.get(userId) ? allMsgData.get(userId) : [];

    dispatch({
        type: SET_TALKER,
        payload: { msgData, userId }
    });
};

//Get All History Msg Data
export const getAllMsgData = () => async dispatch => {
    try {
        const res = await axios.get('/api/users/msg');
        console.log(res.data.allMsgData);
        let obj = res.data.allMsgData;

        let allMsgData = new Map();
        //Transform object to Map
        for (let k of Object.keys(obj)) {
            allMsgData.set(k, obj[k]);
        }
        dispatch({
            type: UPDATE_ALL_MSG_DATA,
            payload: allMsgData
        });
    } catch (error) {
        console.log(error);
    }
};

//Disconnect
export const disconnectWebSocket = () => async dispatch => {
    const state = store.getState();
    const socket = state.chat.socket;
    if (socket) socket.disconnect();

    dispatch({
        type: DISCONNECT_WEBSOCKET,
        payload: {}
    });
};

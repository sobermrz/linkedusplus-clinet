import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  connectWebSocket,
  sendMessage,
  disconnectWebSocket,
} from '../../actions/chat';
import Incoming_msg from './Incoming_msg';
import Outgoing_msg from './Outgoing_msg';

const Mesgs = ({
  user,
  isAuthenticated,
  socket,
  msgData,
  loading,
  connectWebSocket,
  sendMessage,
  nowTalkingTo,
  disconnectWebSocket,
}) => {
  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState('');

  const msgButton = useRef(null);
  const executeScroll = () => {
    msgButton.current.scrollIntoView();
  };

  useEffect(() => {
    if (loading && isAuthenticated) {
      connectWebSocket(user._id);
    }
    executeScroll();
  }, [loading, isAuthenticated, connectWebSocket, executeScroll]);

  const send = () => {
    if (msg === '') {
      return;
    }
    const data = {
      me: true,
      from: user._id,
      to: nowTalkingTo,
      time: new Date(),
      msg: msg,
    };

    sendMessage(socket, data); //action 裡的function

    setMsg('');
  };

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      send();
    }
  };
  return (
    <div className='mesgs'>
      <div className='msg_history'>
        {/*  */}

        {msgData &&
          msgData.map((data, index) =>
            data.me === true ? (
              <Outgoing_msg
                msg={data.msg}
                key={data.toString() + index}
                time={data.time}
              />
            ) : (
              <Incoming_msg
                msg={data.msg}
                key={data.toString() + index}
                time={data.time}
              />
            )
          )}

        {/*  */}
        <div ref={msgButton}></div>
      </div>

      <div className='type_msg'>
        <div className='input_msg_write'>
          {/* Input massage */}
          <input
            type='text'
            className='write_msg'
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            onKeyPress={(e) => handleKeyPress(e)}
            placeholder='Type a message'
          />

          <button className='msg_send_btn' type='button' onClick={send}>
            <i className='fa fa-paper-plane-o' aria-hidden='true'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

Mesgs.prototypes = {
  msgData: PropTypes.object.isRequired,
  disconnectWebSocket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  socket: state.chat.socket,
  msgData: state.chat.msgData,
  loading: state.chat.loading,
  nowTalkingTo: state.chat.nowTalkingTo,
});

export default connect(mapStateToProps, {
  connectWebSocket,
  sendMessage,
  disconnectWebSocket,
})(Mesgs);

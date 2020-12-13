import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setTalker } from '../../actions/chat';

const Chat_list = ({
  nowTalkingTo,
  userId,
  name,
  avatar,
  active,
  setTalker,
  allMsgData,
}) => {
  useEffect(() => {
    if (active) {
      setTalker(userId, allMsgData);
      active = false;
    }
  }, []);

  const onClick = (e) => {
    //要調action用方法更新msgData nowTalingTo active_chat
    console.log('you click ', name, userId);
    setTalker(userId, allMsgData);
  };

  return (
    <div
      className={`chat_list ${nowTalkingTo === userId ? 'active_chat' : ''}`}
      onClick={(e) => onClick(e)}
    >
      <div className='chat_people'>
        <div className='chat_img'>
          {' '}
          <img src={avatar} alt={name} />{' '}
        </div>
        <div className='chat_ib'>
          <h5>
            {name} <span className='chat_date'> </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  nowTalkingTo: state.chat.nowTalkingTo,
  allMsgData: state.chat.allMsgData,
});

export default connect(mapStateToProps, { setTalker })(Chat_list);

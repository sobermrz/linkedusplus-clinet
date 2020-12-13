import React, { Fragment, useEffect } from 'react';
import Inbox_people from './Inbox_people';
import Mesgs from './Mesgs';
import { getAllMsgData } from '../../actions/chat';
import { connect } from 'react-redux';

const Chat = ({ getAllMsgData }) => {
  useEffect(() => {
    //getAllMsgData();
  }, []);
  return (
    <Fragment>
      <h1 className='large text-primary'>Messaging</h1>
      <div className='container_msg'>
        <div className='messaging'>
          <div className='inbox_msg'>
            <Inbox_people />
            <Mesgs />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default connect(null, { getAllMsgData })(Chat);

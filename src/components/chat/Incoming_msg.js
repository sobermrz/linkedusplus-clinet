import React from 'react';
import Moment from 'react-moment';

const Incoming_msg = ({ msg, time }) => {
    return (
        <div className='incoming_msg'>
            <div className='incoming_msg_img'>
                {' '}
                <img
                    src='https://andrewfortest.s3.amazonaws.com/user-profile.png'
                    alt='sunil'
                />{' '}
            </div>
            <div className='received_msg'>
                <div className='received_withd_msg'>
                    <p>{msg}</p>

                    <span className='time_date'>
                        <Moment format='HH:mm'>{time}</Moment>
                        {' | '}
                        {new Date(time).toDateString() ===
                        new Date().toDateString() ? (
                            'Today'
                        ) : (
                            <Moment format='LL'>{time}</Moment>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Incoming_msg;

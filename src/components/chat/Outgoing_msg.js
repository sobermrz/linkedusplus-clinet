import React from 'react';
import Moment from 'react-moment';
const Outgoing_msg = ({ msg, time }) => {
    return (
        <div className='outgoing_msg'>
            <div className='sent_msg'>
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
    );
};

export default Outgoing_msg;

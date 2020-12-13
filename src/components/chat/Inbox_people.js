import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Search from './Search';
import { getFriendsProfiles } from '../../actions/profile';
import Chat_list from './Chat_list';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import moment from 'moment';
import { setTalker } from '../../actions/chat';
const Inbox_people = ({
  profile: { friends, profile_loading },
  chat_loading,
  getFriendsProfiles,
}) => {
  //要讀取所有朋友資料
  useEffect(() => {
    getFriendsProfiles();
  }, [getFriendsProfiles]);

  return (
    <div className='inbox_people'>
      <Search />
      <div className='inbox_chat'>
        {profile_loading || chat_loading ? (
          <Spinner />
        ) : friends.length > 0 ? (
          friends.map((friend, index) => (
            <Chat_list
              key={friend.user._id}
              userId={friend.user._id}
              name={friend.user.name}
              avatar={friend.user.avatar}
              active={index === 0 ? true : false}
            />
          ))
        ) : (
          <span>No friends found...</span>
        )}
      </div>
    </div>
  );
};

Inbox_people.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  chat_loading: state.chat.loading,
  nowTalkingTo: state.chat.nowTalkingTo,
  allMsgData: state.chat.allMsgData,
});

export default connect(mapStateToProps, { getFriendsProfiles, setTalker })(
  Inbox_people
);

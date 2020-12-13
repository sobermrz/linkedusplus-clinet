import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getFriendsProfiles } from '../../actions/profile';

const Profiles = ({ profile: { friends, loading }, getFriendsProfiles }) => {
  useEffect(() => {
    getFriendsProfiles();
  }, [getFriendsProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>My Friends</h1>
          <p className='lead'>
            <i className='fab fa-connectdevelop' /> Browse and connect with your
            friends
          </p>
          <div className='profiles'>
            {friends.length > 0 ? (
              friends.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No friends found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getFriendsProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getFriendsProfiles })(Profiles);

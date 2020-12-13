import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addFriend } from '../../actions/friend';
import { connect } from 'react-redux';
import auth from '../../reducers/auth';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
  addFriend,
  auth,
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='my-1'>{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
        {auth.isAuthenticated && auth.loading === false && (
          <button
            type='button'
            className='btn btn-primary'
            onClick={() => addFriend(_id, name)}
          >
            Add friend
          </button>
        )}
      </div>
      <ul>
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
  addFriend: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addFriend })(ProfileItem);

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addFriend } from '../../actions/friend';
import { connect } from 'react-redux';
import { removeFriend } from '../../actions/friend';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
  removeFriend,
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
        <button
          type='button'
          className='btn btn-danger'
          onClick={() => removeFriend(_id, name)}
        >
          Remove friend
        </button>
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
  removeFriend: PropTypes.func.isRequired,
};

export default connect(null, { removeFriend })(ProfileItem);

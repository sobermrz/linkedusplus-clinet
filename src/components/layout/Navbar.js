import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fas fa-user'></i> <span className='hide-sm'>Users</span>
        </Link>
      </li>
      <li>
        <Link to='/friends'>
          <i className='fa fa-users'></i>{' '}
          <span className='hide-sm'>Friends</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='fa fa-file-text-o'></i>{' '}
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/chat'>
          <i className='fa fa-commenting-o'></i>{' '}
          <span className='hide-sm'>Message</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fa fa-home'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fas fa-user'></i> <span className='hide-sm'>Users</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='fa fa-file-text-o'></i>{' '}
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/register'>
          <i className='fa fa-user-plus'></i>{' '}
          <span className='hide-sm'>Register</span>
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='fa fa-sign-in'></i>{' '}
          <span className='hide-sm'>Login</span>
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-link'></i> LinkedUs
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatesToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatesToProps, { logout })(Navbar);

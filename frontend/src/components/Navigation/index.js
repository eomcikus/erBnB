import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotModal from '../CreateSpotModal'
import './Navigation.css';
import logo from '../../images/erbnb.png'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <div className='profile-button-container'>
      <CreateSpotModal className='become-host-button' />
      <ProfileButton  user={sessionUser} />
      </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <div className='topnav-container'>

          <div>
            <NavLink exact to="/"><img src={logo}/></NavLink>
          </div>
          <div>
          {isLoaded && sessionLinks}
          </div>

    </div>
  );
}

export default Navigation;
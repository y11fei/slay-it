import { useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import style from '../styles/Navigation.module.scss';
import postService from '../services/post';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = ({ handleSearch }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      postService.setToken(user.token);
      setLoggedIn(true);
    }
  }, []);

  const handleLogOut = () => {
    console.log('logged out');
    window.localStorage.clear();
    setUser('');
    window.location.href = '/';
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container className={style.Container}>
        <h2
          onClick={() => {
            navigate('/');
          }}
        >
          slayIt <LoyaltyIcon fontSize="large" />
        </h2>
        <SearchBar onChange={handleSearch} />
        <div className={style.account}>
          {loggedIn ? (
            <Profile handleLogOut={handleLogOut} user={user} />
          ) : (
            <LoginButton />
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Navigation;

const LoginButton = () => {
  let navigate = useNavigate();

  return (
    <div
      className={style.user}
      onClick={() => {
        navigate('/login');
      }}
    >
      Login
    </div>
  );
};

const Profile = ({ handleLogOut, user }) => {
  let navigate = useNavigate();
  return (
    <div className={style.profile}>
      <div className={style.profileTitle} onClick={() => navigate('/')}>
        mySlay
      </div>

      <div className={style.dropdown}>
        <div
          className={style.mySlay}
          onClick={() => {
            navigate(`/users/${user.username}`);
          }}
        >
          Profile
        </div>
        <div className={style.logOut} onClick={handleLogOut}>
          Log Out
        </div>
      </div>
    </div>
  );
};

const SearchBar = styled.input`
  width: 500px;
  border-radius: 15px;
  border: 1.5px solid white;
  background-color: rgba(188, 178, 178, 0.25);
  padding: 10px 15px;
  font-family: Verdana, sans-serif;
  @media (max-width: 600px) {
    width: 150px;
    height: 40px;
  }
  :hover {
    border: 3px solid gray;
  }
`;

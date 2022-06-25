import { useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button } from 'react-bootstrap';
import style from '../styles/Login.module.scss';
import Navigation from './Navigation';
import loginService from '../services/login';
import postService from '../services/post';
import userService from '../services/users';
import Notification from './Notification';

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [newUser, setNewUser] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const display = { display: message === null ? 'none' : '' };

  const handleVisibility = () => {
    setVisible(!visible);
    if (visible === false) {
      setPasswordType('password');
    } else {
      setPasswordType('text');
    }
  };

  const handleAnonymous = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: 'anonymous',
        password: 'anonymous',
      });
      console.log('username', user.username + ' logged in');
      setUser(user);
      postService.setToken(user.token);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      window.location.href = '/';
    } catch (exception) {
      setMessage('Sorry, try again!');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  const handleCreate = (event) => {
    event.preventDefault();
    if (newUser === '' || newPassword === '') {
      console.log('empty');
    } else {
      const user = { username: newUser, password: newPassword };
      try {
        userService.createNew(user);
        setMessage('Welcome! You can login now :)!');
        setTimeout(() => {
          setMessage(null);
        }, 2000);
        setNewUser('');
        setNewPassword('');
      } catch (exception) {
        setTimeout(() => {
          setMessage('Sorry, try one more time!');
          setMessage(null);
        }, 2000);
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      postService.setToken(user.token);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      console.log(username + 'logged in');
      window.location.href = '/';
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Oops! Wrong credentials!');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };
  return (
    <div>
      <Navigation
        handleSearch={() => {
          return null;
        }}
      />
      <Notification message={message} display={display} />
      <div className={style.main}>
        <h1>Create Account or Login! </h1>
        <div className={style.container}>
          <div className={style.create}>
            <div>
              <h3>Create Account</h3>
              <div className={style.createuser}>
                <p>Username</p>
                <Input
                  type="text"
                  onChange={(e) => setNewUser(e.target.value)}
                />
              </div>
              <div className={style.createpass}>
                <p>Password</p>
                <Input
                  type={passwordType}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className={style.eye} onClick={handleVisibility}>
                  {visible ? (
                    <Visibility
                      fontSize="medium"
                      style={{ color: 'white' }}
                    ></Visibility>
                  ) : (
                    <VisibilityOff
                      fontSize="medium"
                      style={{ color: 'white' }}
                    ></VisibilityOff>
                  )}
                </div>
              </div>
              <Button
                variant="secondary"
                style={{ width: '15rem' }}
                className={style.createBtn}
                onClick={handleCreate}
              >
                Create Account
              </Button>
            </div>
          </div>
          <div className={style.login}>
            <div>
              <h3>Login</h3>
              <div className={style.loginuser}>
                <p>Username</p>
                <Input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className={style.loginpass}>
                <p>Password</p>
                <Input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={style.buttons}>
                <Button
                  variant="secondary"
                  style={{ width: '15rem' }}
                  className={style.button}
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button
                  variant="secondary"
                  style={{ width: '15rem' }}
                  className={style.button}
                  onClick={handleAnonymous}
                >
                  Login as Anonymous
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

const Input = styled.input`
  width: 15rem;
  height: 2.5rem;
  background-color: rgba(135, 135, 135, 0.75);
  color: white;
  border: 2px solid rgb(148, 148, 148);
  border-radius: 10px;
`;

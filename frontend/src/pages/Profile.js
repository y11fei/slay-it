/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import userService from '../services/users';
import Navigation from '../Components/Navigation';
import Post2 from '../Components/Post2';
import style from '../styles/Profile.module.scss';
import { Person } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import postService from '../services/post';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const { currentuser } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .getAll()
      .then((users) =>
        setUser(users.filter((user) => user.username === currentuser)[0])
      );

    console.log('user', user);
  }, [{ currentuser }]);

  const addLike = async (id) => {
    const thePost = posts.filter((item) => item.id === id)[0];
    thePost.likes++;
    const changedPost = { ...thePost };
    await postService.update(id, changedPost);
    setPosts([...posts]);
  };

  const addDislike = async (id) => {
    console.log('disliked', id);
    const thePost = posts.filter((item) => item.id === id)[0];
    thePost.dislikes++;
    const changedPost = { ...thePost };
    await postService.update(id, changedPost);
    setPosts([...posts]);
  };

  const handleLink = (id) => {
    // window.location.href = `/posts/${id}`;
    navigate(`/posts/${id}`);
  };

  const handleUser = (username) => {
    navigate(`/users/${username}`);
  };

  return (
    <div>
      <Navigation
        handleSearch={() => {
          return null;
        }}
      />
      <div className={style.box}>
        <div className={style.container}>
          <div
            className={style.dummyHover}
            onClick={() => setPosts(user.posts)}
          >
            <Dummy user={currentuser} />
          </div>
          <div className={style.posts}>
            {posts?.map((post, id) => (
              <Post2
                key={id}
                post={post}
                user={user}
                addLike={addLike}
                addDislike={addDislike}
                handleLink={handleLink}
                handleUser={handleUser}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Dummy = ({ user }) => {
  return (
    <div className={style.main}>
      <div className={style.top}>
        <div className={style.icon}>
          <Person fontSize="large" style={{ transform: 'scale(2.75)' }} />
        </div>
        <h3>
          <span style={{ textDecoration: 'underline', fontStyle: 'italic' }}>
            {user}&apos;
          </span>{' '}
          slays
        </h3>
      </div>
      <div className={style.click}>click to see slays</div>
    </div>
  );
};

export default UserProfile;

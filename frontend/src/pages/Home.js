/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import Create from '../Components/Create';
import Post from '../Components/Post';
import postService from '../services/post';
import '../styles/globals.scss';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [displayPost, setDisplayPost] = useState({});
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [allNames, setShowAll] = useState(true);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      setDisplayPost({ display: '' });
    } else {
      setDisplayPost({ display: 'none' });
    }
  }, []);

  useEffect(() => {
    postService.getAll().then((initialPosts) => {
      setPosts(initialPosts.reverse());
      console.log('posts', posts);
    });
  }, []);

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

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setShowAll(!allNames);
  };

  const useFiltered = allNames
    ? posts
    : posts.filter(
        (post) => post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
      );

  return (
    <>
      <div className="main">
        <Navigation handleSearch={handleSearch} />
        <div className="posts">
          <Create displayPost={displayPost} />
          {useFiltered.map((post, id) => (
            <Post
              key={id}
              post={post}
              addLike={addLike}
              addDislike={addDislike}
              handleLink={handleLink}
              handleUser={handleUser}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

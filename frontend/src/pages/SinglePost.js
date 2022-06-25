/* eslint-disable react-hooks/exhaustive-deps */
import postService from '../services/post';
import { useEffect, useState } from 'react';
import {
  FavoriteBorder,
  ChatBubbleOutline,
  MoodBad,
} from '@mui/icons-material';
import Navigation from '../Components/Navigation';
import style from '../styles/FullPost.module.scss';
import commentService from '../services/comments';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    postService.getById(postId).then((item) => setPost(item));
    console.log(post);
  }, [{ postId }]);

  const addLike = async (id) => {
    post.likes++;
    const changedPost = { ...post };
    await postService.update(id, changedPost);
    setPost(changedPost);
  };

  const addDislike = async (id) => {
    post.dislikes++;
    const changedPost = { ...post };
    await postService.update(id, changedPost);
    setPost(changedPost);
  };

  const handleAddToPost = (object, id) => {
    try {
      post.comments.push(object);
      const newPost = { ...post };
      postService.update(id, newPost);
      console.log('newPost', newPost);
      setPost(newPost);
    } catch (exception) {
      console.log('nope');
    }
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
      <div className={style.main}>
        <Dummy
          post={post}
          addLike={addLike}
          addDislike={addDislike}
          handleUser={handleUser}
        />
        <Comment post={post} handleAddToPost={handleAddToPost} />
        {post.comments?.map((comment, id) => (
          <ViewComments key={id} comment={comment} handleUser={handleUser} />
        ))}
      </div>
    </div>
  );
};

const Dummy = ({ post, addLike, addDislike, handleUser }) => {
  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.hashtag}>
          <p>#{post.hashtag}</p>
        </div>
        <p>
          Posted by{' '}
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => handleUser(post.user.username)}
          >
            {post.user?.username}
          </span>
        </p>
      </div>
      <h2 className={style.title}>{post.title}</h2>
      <div className={style.paragraph}>{post.content}</div>
      <div className={style.thoughts}>
        <div className={style.likes}>
          <FavoriteBorder
            className={style.favorite}
            onClick={() => addLike(post.id)}
          />
          {post.likes} likes
        </div>
        <div className={style.comments}>
          <ChatBubbleOutline />
          {post.comments?.length} comments
        </div>
        <div className={style.dislikes}>
          <MoodBad className={style.bad} onClick={() => addDislike(post.id)} />
          {post.dislikes} dislikes
        </div>
      </div>
    </div>
  );
};

const Comment = ({ handleAddToPost, post }) => {
  const [displayPost, setDisplayPost] = useState({});
  const [username, setUsername] = useState('');
  const [paragraph, setParagraph] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      setDisplayPost({ display: '' });
      const loggedUser = JSON.parse(loggedUserJSON);
      commentService.setToken(loggedUser.token);
      setUsername(loggedUser.username);
      console.log('user', username);
    } else {
      setDisplayPost({ display: 'none' });
    }
  }, []);

  const handleComment = async () => {
    const newComment = { content: paragraph, postedBy: username };
    console.log('waiting...');
    try {
      const newOne = await commentService.createNew(newComment);
      console.log('new one', newOne);
      handleAddToPost(newOne, post.id);
    } catch (exception) {
      console.log('didnt work');
    }
    setParagraph('');
    console.log('added');
  };

  return (
    <div className={style.comment} style={displayPost}>
      <div>
        <textarea
          className={style.commentContent}
          cols="93"
          rows="5"
          placeholder="Add your thoughts"
          onChange={(e) => setParagraph(e.target.value)}
        ></textarea>
      </div>
      <div>
        <button className={style.commentBtn} onClick={handleComment}>
          Post Comment
        </button>
      </div>
    </div>
  );
};

const ViewComments = ({ comment, handleUser }) => {
  return (
    <div className={style.view}>
      <div className={style.commenter}>
        Comment by{' '}
        <span
          className={style.commenterUser}
          style={{ textDecoration: 'underline' }}
          onClick={() => handleUser(comment.postedBy)}
        >
          {comment.postedBy}
        </span>
      </div>
      <hr className={style.line}></hr>
      <div className={style.commentText}>{comment.content}</div>
    </div>
  );
};
export default PostPage;

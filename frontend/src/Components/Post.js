import {
  FavoriteBorder,
  ChatBubbleOutline,
  MoodBad,
} from '@mui/icons-material';
import style from '../styles/Post.module.scss';

const Post = ({ post, addLike, addDislike, handleLink, handleUser }) => {
  return (
    <div className={style.container}>
      <div className={style.click}>
        <div className={style.top}>
          <div className={style.hashtag}>
            <p>#{post.hashtag}</p>
          </div>
          <p>
            Posted by{' '}
            <span
              onClick={() => handleUser(post.user.username)}
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              {post.user.username}
            </span>
          </p>
        </div>
        <h2 onClick={() => handleLink(post.id)} className={style.title}>
          {post.title}
        </h2>
        <div className={style.paragraph}>{post.content}</div>
      </div>
      <div className={style.thoughts}>
        <div onClick={() => addLike(post.id)} className={style.likes}>
          <FavoriteBorder className={style.favorite} />
          {post.likes} likes
        </div>
        <div className={style.comments}>
          <ChatBubbleOutline /> {post.comments.length} comments
        </div>
        <div className={style.dislikes} onClick={() => addDislike(post.id)}>
          <MoodBad className={style.bad} /> {post.dislikes} dislikes
        </div>
      </div>
    </div>
  );
};

export default Post;

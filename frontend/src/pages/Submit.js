import style from '../styles/Submit.module.scss';
import Navigation from '../Components/Navigation';
import styled from 'styled-components';
import postService from '../services/post';
import { useEffect, useState } from 'react';

const Submit = () => {
  const [title, setTitle] = useState('');
  const [hashtag, setHashtag] = useState('');
  const [paragraph, setParagraph] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    const loggedUser = JSON.parse(loggedUserJSON);
    postService.setToken(loggedUser.token);
  }, []);

  const handleSubmit = async () => {
    const newObject = {
      title: title,
      content: paragraph,
      hashtag: hashtag,
    };
    await postService.createNew(newObject);
    window.location.href = '/';
    console.log('posted');
  };
  return (
    <div>
      <Navigation />
      <div className={style.main}>
        <div className={style.create}>
          <div className="top">
            <h2>Add Your Slay...</h2>
            <hr></hr>
          </div>
          <div>
            <textarea
              className={style.hashtag}
              cols={20}
              rows={1}
              placeholder="hashtag"
              onChange={(e) => setHashtag(e.target.value)}
            ></textarea>
          </div>
          <textarea
            cols={90}
            placeholder="Title"
            className={style.title}
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>
          <textarea
            cols={90}
            rows={10}
            placeholder="Add text here..."
            className={style.paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          ></textarea>
          <Button onClick={handleSubmit}>Post</Button>
        </div>
      </div>
    </div>
  );
};

export default Submit;

const Button = styled.button`
  width: 7rem;
  height: 2.5rem;
  background-color: white;
  border: 2px solid gray;
  color: gray;
  border-radius: 35px;
  font-family: Verdana, sans-serif;
  font-weight: bold;
  :hover {
    background-color: gray;
    border: 2px solid white;
    color: white;
  }
`;

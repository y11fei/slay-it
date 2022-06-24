import styled from 'styled-components';
import style from '../styles/Create.module.scss';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Create = ({ displayPost }) => {
  const navigate = useNavigate();
  return (
    <div className={style.container} style={displayPost}>
      <div className={style.title}>
        <h3>Add Slay</h3>
        <Add className={style.add} />
      </div>

      <TypeBar
        onClick={() => navigate('/submit')}
        placeholder="Create Slay..."
      />
    </div>
  );
};

export default Create;

const TypeBar = styled.input`
  width: 800px;
  height: 3rem;
  border: 2px solid gray;
  border-radius: 5px;
  background-color: rgb(171, 167, 167, 0.75);
  padding-left: 15px;
  font-size: 15px;
  font-family: 'Verdana', sans-serif;
  @media (max-width: 600px) {
    width: 350px;
  }
  :hover {
    border: 3px solid white;
  }
`;

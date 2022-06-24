import { useParams } from 'react-router-dom';

const Dummy = () => {
  const { dummy } = useParams();
  const random = { dummy };

  return <h1>this is {random}</h1>;
};

export default Dummy;

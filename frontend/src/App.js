import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Submit from './pages/Submit';
import UserProfile from './pages/Profile';
import PostPage from './pages/SinglePost';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="users/:currentuser" element={<UserProfile />} />
        <Route path="posts/:postId" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
};

const HomePage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default App;

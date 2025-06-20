import './App.css';
import Feed from './components/Feed';
import Login from './components/Login';
import Profile from './components/Profile'; // 👈 create this component
import { useGlobal } from './context/GlobalContex';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App() {
  const { userId } = useGlobal();

  return (
    <Router>
      <Routes>
        {!userId ? (
          <Route path="*" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Feed />} />
              <Route path="/profile/:userName" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

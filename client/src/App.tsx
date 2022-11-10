import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/Register';
import Profile from 'pages/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

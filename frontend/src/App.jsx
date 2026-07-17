import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Buku from './pages/Buku';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />} />
        <Route path="/buku" element={<Buku />} />
        <Route path="/profile" element={<Profile />} />

        {/* <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/buku"
          element={
            <RequireAuth>
              <Buku />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        /> */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;

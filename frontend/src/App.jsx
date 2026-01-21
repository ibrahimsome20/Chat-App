import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import ChatPage from './pages/chatPages.jsx';
import Allcontactc from './pages/Allcontactc.jsx';
import Setting from './pages/Setting.jsx';
import UserChatsPage from './pages/UserChatsPage.jsx';
import userStore from './store/User.store.js';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isAuthenticated, isAuth } = userStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const check = async () => {
      await isAuthenticated();
      setCheckingAuth(false);
    };
    check();
  }, []);

  // Loader while checking authentication
  if (checkingAuth) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-cyan-400 bg-[#101A2E]">
        Checking Authentication...
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-[#101A2E]">
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signUp"
          element={!isAuth ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/contact"
          element={isAuth ? <Allcontactc /> : <Navigate to="/login" />}
        />
        <Route
          path="/setting"
          element={isAuth ? <Setting /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={isAuth ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/userChat"
          element={isAuth ? <UserChatsPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: '#0f172a',
            color: '#22d3ee',
            fontSize: '14px',
            padding: '8px 16px',
            borderRadius: '8px',
          },
        }}
      />
    </div>
  );
}

export default App;

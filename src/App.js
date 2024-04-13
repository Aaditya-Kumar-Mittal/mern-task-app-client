// import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
// import Header from './components/partials/Header.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for react-toastify


function App() {


  // const info = localStorage.getItem('user');
  // const [user, setUser] = useState(JSON.parse(info));
  return (
    <>
      <BrowserRouter>
        <div>
          {/* <Header /> */}
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

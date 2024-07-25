import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ darkMode }) => {
  const [data,setdata] = useState('');
  const Username = useRef(null);
  const Password = useRef(null);
  const navigate = useNavigate();

  useEffect(()=>{
      sessionStorage.removeItem('isAuthenticated');
  },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const name = Username.current.value;
    const password = Password.current.value;
    console.log(name);

    try {
      const response = await axios.post("https://spotify-clone-backend-f1ve.onrender.com/Login", {
        name,
        password,
      });
      console.log(response.data);
      setdata(response.data);
      if (response.data == 'verified') {
        toast.success("Logged in", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        sessionStorage.setItem('isAuthenticated','Authenticated',{expires:1});

        sessionStorage.setItem('Username',name);
        sessionStorage.setItem('Password',password);

        
        setTimeout(() => {
          navigate('/');
        }, 5000);
        
      }
      else
      {
        toast.error("Login failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex flex-col items-center justify-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-md w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1
          className={`text-3xl font-bold mb-6 text-center ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="Username" className="block mb-1">
              Username
            </label>
            <input
              type="text"
              id="Username"
              name="Username"
              ref={Username}
              placeholder="Enter your Username"
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none ${
                darkMode ? "bg-gray-700 text-white" : ""
              }`}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              ref={Password}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none ${
                darkMode ? "bg-gray-700 text-white" : ""
              }`}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 px-4 rounded-lg focus:outline-none  ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-blue-500 text-white hover:bg-blue-600 transition"
            }`}
          >
            Login
          </button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
      </div>
    </motion.div>
  );
};

export default Login;

import React, { useState } from "react";
import Axios from 'axios';

function Login(props) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const { user, setUser, token, setToken } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('http://localhost:5000/api/auth/login', login);
      const token = {
        headers: {
          'auth-token': data.token
        }
      }
      setToken(token);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(token));
      window.location = '/';
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });
  }

  return (
  <div className="login">
      {!user &&
      <form onSubmit={handleSubmit}>
      <input 
        name="email"
        type="text"
        value={login.email}
        onChange={handleChange}
      />
      <input 
        name="password"
        type="password"
        value={login.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>}
    {user &&
    <p>You are already logged in.</p>
    }
  </div>
  );
}

export default Login;

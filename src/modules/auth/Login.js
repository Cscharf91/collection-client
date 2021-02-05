import React, { useState } from "react";
import Axios from 'axios';

function Login(props) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const { user, setUser, setToken } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post('https://vast-ravine-96250.herokuapp.com/api/auth/login', login);
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
  <div className="card">
      {!user &&
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            name="email"
            type="text"
            value={login.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            name="password"
            type="password"
            value={login.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
    </form>}
    {user &&
    <p>You are already logged in.</p>
    }
  </div>
  );
}

export default Login;

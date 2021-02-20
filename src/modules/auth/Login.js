import React, { useState } from "react";
import Axios from 'axios';
import { useHistory } from "react-router-dom";

function Login(props) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser, setToken } = props;
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await Axios.post('https://thawing-mountain-86418.herokuapp.com/api/auth/login', login);
      const token = {
        headers: {
          'auth-token': data.token
        }
      }
      setLoading(false);
      setError("");
      setToken(token);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(token));
      history.push('/');
    } catch (err) {
      setLoading(false);
      setError("Invalid credentials. Please try again.");
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
        <p className="danger-txt">{error}</p>
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
        <button disabled={loading} type="submit">{loading ? "Loading..." : "Submit"}</button>
    </form>}
    {user &&
    <p>You are already logged in.</p>
    }
  </div>
  );
}

export default Login;

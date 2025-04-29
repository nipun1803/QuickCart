import React, { useState } from 'react';
import './AccountPage.css'; 

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setErrorMessage('Please enter both username and password.');
    } else {
      if (username === 'user123' && password === 'password123') {
        setErrorMessage('');
        alert('Login Successful!');
      } else {
        setErrorMessage('Invalid username or password.');
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="login-card">
        <h2>Login to Quickcart</h2>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>


          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>


          {errorMessage && <div className="error-message">{errorMessage}</div>}


          <button type="submit" className="login-btn">Login</button>

          <div className="extra-links">
            <p><a href="#">Forgot Password?</a></p>
            <p>Don't have an account? <a href="#">Sign Up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
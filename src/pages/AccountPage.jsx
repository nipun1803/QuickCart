import React, { useState } from 'react';
import toast from 'react-hot-toast';
import '../styles/AccountPage.css'; 
import { signIn, signUp, signInWithGoogle, logOut } from "../Services/Auth.js";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [mode, setMode] = useState('login'); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      toast.error('Please enter both email and password.');
      return;
    }

    try {
      if (mode === 'login') {
        const user = await signIn(email, password);
        toast.success(`Welcome back, ${user.email}!`);
      } else {
        const user = await signUp(email, password);
        toast.success(`Account created successfully for ${user.email}!`);
      }
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      toast.success(`Signed in with Google as ${user.email}!`);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="login-card">
        <h2>{mode === 'login' ? 'Login to Quickcart' : 'Create your Quickcart Account'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              required
            />
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button type="submit" className="login-btn">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>

          <button type="button" className="login-btn google-btn" onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>

          <div className="extra-links">
            {mode === 'login' ? (
              <>
                <p><a href="#">Forgot Password?</a></p>
                <p>Don't have an account? <a onClick={() => setMode('signup')}>Sign Up</a></p>
              </>
            ) : (
              <p>Already have an account? <a onClick={() => setMode('login')}>Login</a></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

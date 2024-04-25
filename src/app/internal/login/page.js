'use client'

import DOMPurify from "dompurify";
import Link from "next/link";
import React from "react";
import './Login.css';

export default function Login() {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!/[a-zA-Z0-9]/.test(username)) {
      setErrorMessage('Username must be alphanumeric only');
      return;
    }

    const sanitizedUsername = DOMPurify.sanitize(username);
    const passwordHash = Array.from(
      new Uint8Array(
        await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password))
      )
    ).map((b) => b.toString(16).padStart(2, "0")).join("");

    const encodedPayload = Buffer.from(JSON.stringify({
      username: sanitizedUsername,
      password: passwordHash
    })).toString('base64');

    console.groupCollapsed('TODO: Implement login functionality');
    console.log(`Payload: ${encodedPayload}`);
    console.groupEnd();

    window.location.href = '/internal/dashboard';
  };

  return (
    <div className="login-container">
      <div className="filler"></div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" minLength="6" maxLength="20" onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage('');
          }} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" minLength="12" maxLength="72" onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage('');
          }} required />
        </div>
        {errorMessage && <div className="error-message"><center>{errorMessage}</center></div>}
        <button type="submit">Login</button>
      </form>
      <Link className="link home" href="/">&lt; Home</Link>
      <div className="filler"></div>
    </div>
  );
};

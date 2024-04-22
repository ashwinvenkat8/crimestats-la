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

    const sanitizedUsername = DOMPurify.sanitize(username);
    const passwordHash = Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-512",
          new TextEncoder().encode(password)
        )
      )
    ).map((b) => b.toString(16).padStart(2, "0")).join("");

    const encodedPayload = Buffer.from(JSON.stringify({ username: sanitizedUsername, password: passwordHash })).toString('base64'); // To decode: Buffer.from(<ENCODED_STRING>, 'base64').toString('ascii');

    console.group('TODO: Implement login functionality');
    console.log(`Payload: ${JSON.stringify({ username: username, password: passwordHash })}\tEncoded: ${encodedPayload}`);
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
          <input type="text" name="username" onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage('');
          }} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={(e) => {
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

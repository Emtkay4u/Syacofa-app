"use client";

import { useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { app } from "../../firebase"; // Corrected path

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Signed up successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleLogIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Authentication</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      ) : (
        <form>
          <h2>Sign Up / Log In</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <button type="submit" onClick={handleSignUp} style={{ marginRight: '1rem' }}>Sign Up</button>
            <button type="submit" onClick={handleLogIn}>Log In</button>
          </div>
        </form>
      )}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}

"use client";

import { useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { app } from "../../firebase";
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/verify-phone');
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
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="form-container">
      <h1 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
        Welcome to Syacofa
      </h1>
      <h2 style={{ textAlign: 'center', color: '#4a5568', marginBottom: '2rem' }}>
        Sign Up or Log In
      </h2>
      <form>
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
          <button type="submit" onClick={handleLogIn}>Log In</button>
        </div>
        <div style={{ marginTop: '0.75rem' }}>
          <button type="submit" onClick={handleSignUp} style={{ backgroundColor: '#4a5568' }}>Sign Up</button>
        </div>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
    </div>
  );
}

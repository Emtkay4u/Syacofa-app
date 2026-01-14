'use client';

import { useState, useEffect } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { app } from "../firebase"; // Adjusted path
import { useRouter } from 'next/navigation';

export default function HomePage() {
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
      router.push('/dashboard'); // Redirect to a dashboard or welcome page
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
      router.push('/dashboard'); // Redirect to a dashboard or welcome page
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
    return null; // Avoid rendering the page if the user is already logged in
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
      background: '#f0f2f5',
    }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: '#1a202c', marginBottom: '1rem' }}>
          Welcome to Syacofa
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#4a5568', maxWidth: '600px' }}>
          Your new platform for community, connection, and opportunity. Join us and start building your future today.
        </p>
      </div>

      <div className="form-container" style={{ 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '8px', 
        boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', color: '#4a5568', marginBottom: '2rem' }}>
          Get Started
        </h2>
        <form>
          <div>
            <label style={{ display: 'block', textAlign: 'left', marginBottom: '0.5rem', color: '#4a5568' }}>
              Email:
              <input 
                type="email" 
                name="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e0' }}
              />
            </label>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', textAlign: 'left', marginBottom: '0.5rem', color: '#4a5568' }}>
              Password:
              <input 
                type="password" 
                name="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #cbd5e0' }}
              />
            </label>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" onClick={handleLogIn} style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              color: 'white',
              backgroundColor: '#3182ce',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              flex: 1,
              marginRight: '0.5rem'
            }}>Log In</button>
            <button type="submit" onClick={handleSignUp} style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              color: 'white',
              backgroundColor: '#4a5568',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              flex: 1,
              marginLeft: '0.5rem'
            }}>Sign Up</button>
          </div>
        </form>
        {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
      </div>
    </div>
  );
}

"use client";

import Link from 'next/link';

export default function HomePage() {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
      background: '#f0f2f5', // A light background color
    }}>
      <h1 style={{ fontSize: '3rem', color: '#1a202c', marginBottom: '1rem' }}>
        Welcome to Syacofa
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#4a5568', maxWidth: '600px', marginBottom: '2.5rem' }}>
        Your new platform for community, connection, and opportunity. Join us and start building your future today.
      </p>
      <Link 
        href="/auth"
        style={{
          display: 'inline-block',
          padding: '1rem 2.5rem',
          fontSize: '1.25rem',
          color: 'white',
          backgroundColor: '#3182ce', // A nice blue color
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          textDecoration: 'none',
          boxShadow: '0 4px 14px 0 rgba(0, 118, 255, 0.39)',
        }}
      >
        Get Started
      </Link>
    </div>
  );
}

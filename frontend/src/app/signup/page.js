'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://tuition-management-system-v05o.onrender.com';

    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Account created successfully! You can now sign in.' });
      } else {
        setMessage({ type: 'error', text: data.detail || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to connect to the server.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="Tuition Flow Logo" 
            width={32} 
            height={32} 
          />
          Tuition<span>Flow</span>
        </Link>
      </header>

      <section className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join TuitionFlow to manage your learning journey</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="full_name">Full Name</label>
              <input 
                type="text" 
                id="full_name" 
                name="full_name" 
                placeholder="John Doe" 
                required 
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="john@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Join as</label>
              <div className={styles.roleToggle}>
                <button 
                  type="button" 
                  className={formData.role === 'student' ? styles.activeRole : ''}
                  onClick={() => setFormData({ ...formData, role: 'student' })}
                >
                  Student
                </button>
                <button 
                  type="button" 
                  className={formData.role === 'tutor' ? styles.activeRole : ''}
                  onClick={() => setFormData({ ...formData, role: 'tutor' })}
                >
                  Tutor
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {message && (
            <div className={`${styles.message} ${styles[message.type]}`}>
              {message.text}
            </div>
          )}

          <p className={styles.footerText}>
            Already have an account? <Link href="/signin">Sign In</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

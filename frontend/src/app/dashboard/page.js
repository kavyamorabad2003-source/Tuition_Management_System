'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/signin');
    } else {
      setUser(JSON.parse(userData));
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/signin');
  };

  if (loading) {
    return <div className={styles.loader}>Loading Dashboard...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            <Image src="/logo.png" alt="Tuition Flow" width={32} height={32} />
            Tuition<span>Flow</span>
          </Link>
        </div>
        
        <nav className={styles.navLinks}>
          <Link href="/dashboard" className={styles.navItemActive} style={{ textDecoration: 'none' }}>
            <span className={styles.navIcon}>📊</span> Dashboard
          </Link>
          <div className={styles.navItem}>
            <span className={styles.navIcon}>📚</span> My Classes
          </div>
          <div className={styles.navItem}>
            <span className={styles.navIcon}>💳</span> Payments
          </div>
          <div className={styles.navItem}>
            <span className={styles.navIcon}>⚙️</span> Settings
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Overview</h1>
            <p>Welcome to your control center.</p>
          </div>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              {user.full_name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.full_name}</span>
              <span className={styles.userRole}>{user.role}</span>
            </div>
          </div>
        </header>

        <section className={styles.contentGrid}>
          {/* Welcome Card */}
          <div className={`${styles.card} ${styles.welcomeCard}`}>
            <div className={styles.welcomeText}>
              <h2>Welcome back, {user.full_name.split(' ')[0]}!</h2>
              <p>You have 2 upcoming classes this week and 1 pending assignment. Keep up the great work!</p>
              <button className={styles.primaryBtn}>View Schedule</button>
            </div>
            <div className={styles.welcomeGraphic}>
              <div className={styles.floatingCircle1}></div>
              <div className={styles.floatingCircle2}></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <h3>Classes Attended</h3>
              <p className={styles.statNumber}>12</p>
              <span className={styles.statTrend}>+2 this month</span>
            </div>
            <div className={styles.statCard}>
              <h3>Average Score</h3>
              <p className={styles.statNumber}>94%</p>
              <span className={styles.statTrend}>Top 10%</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

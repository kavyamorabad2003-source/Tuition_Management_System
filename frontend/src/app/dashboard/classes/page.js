'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function MyClasses() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for classes
  const mockClasses = [
    { id: 1, title: 'Advanced Mathematics', tutor: 'Prof. Sarah Jenkins', time: 'Mon, Wed 10:00 AM', status: 'Upcoming', progress: '30%' },
    { id: 2, title: 'Physics 101: Mechanics', tutor: 'Dr. Robert Chen', time: 'Tue, Thu 2:00 PM', status: 'Active', progress: '65%' },
    { id: 3, title: 'Introduction to Python', tutor: 'Emily Stone', time: 'Fri 1:00 PM', status: 'Upcoming', progress: '10%' },
  ];

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
    return <div className={styles.loader}>Loading Classes...</div>;
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
          <Link href="/dashboard" className={styles.navItem} style={{ textDecoration: 'none' }}>
            <span className={styles.navIcon}>📊</span> Dashboard
          </Link>
          <div className={styles.navItemActive}>
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
            <h1>My Classes</h1>
            <p>Manage and track your enrolled courses.</p>
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
          {mockClasses.map((cls) => (
            <div key={cls.id} className={styles.classCard}>
              <div className={styles.cardHeader}>
                <span className={`${styles.statusBadge} ${cls.status === 'Active' ? styles.statusActive : styles.statusUpcoming}`}>
                  {cls.status}
                </span>
              </div>
              <h2 className={styles.classTitle}>{cls.title}</h2>
              
              <div className={styles.classDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailIcon}>👨‍🏫</span>
                  <span className={styles.detailText}>{cls.tutor}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailIcon}>⏰</span>
                  <span className={styles.detailText}>{cls.time}</span>
                </div>
              </div>

              <div className={styles.progressSection}>
                <div className={styles.progressLabel}>
                  <span>Course Progress</span>
                  <span>{cls.progress}</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: cls.progress }}></div>
                </div>
              </div>

              <button className={styles.actionBtn}>
                {cls.status === 'Active' ? 'Join Class Now' : 'View Materials'}
              </button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

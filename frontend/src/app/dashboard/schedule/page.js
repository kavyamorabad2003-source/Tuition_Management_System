'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Schedule() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for weekly schedule
  const scheduleData = [
    { day: 'Monday', classes: [{ title: 'Advanced Mathematics', time: '10:00 AM - 11:30 AM', tutor: 'Prof. Jenkins' }] },
    { day: 'Tuesday', classes: [{ title: 'Physics 101: Mechanics', time: '02:00 PM - 03:30 PM', tutor: 'Dr. Robert Chen' }] },
    { day: 'Wednesday', classes: [{ title: 'Advanced Mathematics', time: '10:00 AM - 11:30 AM', tutor: 'Prof. Jenkins' }] },
    { day: 'Thursday', classes: [{ title: 'Physics 101: Mechanics', time: '02:00 PM - 03:30 PM', tutor: 'Dr. Robert Chen' }] },
    { day: 'Friday', classes: [{ title: 'Introduction to Python', time: '01:00 PM - 02:30 PM', tutor: 'Emily Stone' }] },
    { day: 'Saturday', classes: [] },
    { day: 'Sunday', classes: [] }
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
    return <div className={styles.loader}>Loading Schedule...</div>;
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
          <Link href="/dashboard/classes" className={styles.navItem} style={{ textDecoration: 'none' }}>
            <span className={styles.navIcon}>📚</span> My Classes
          </Link>
          <Link href="/dashboard/payments" className={styles.navItem} style={{ textDecoration: 'none' }}>
            <span className={styles.navIcon}>💳</span> Payments
          </Link>
          <Link href="/dashboard/settings" className={styles.navItem} style={{ textDecoration: 'none' }}>
            <span className={styles.navIcon}>⚙️</span> Settings
          </Link>
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
            <h1>My Schedule</h1>
            <p>Your weekly academic overview.</p>
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

        <section className={styles.calendarGrid}>
          {scheduleData.map((item, index) => (
            <div key={index} className={styles.dayColumn}>
              <div className={styles.dayHeader}>
                <h3>{item.day}</h3>
              </div>
              <div className={styles.classSlots}>
                {item.classes.length > 0 ? (
                  item.classes.map((cls, idx) => (
                    <div key={idx} className={styles.scheduleCard}>
                      <span className={styles.timeTag}>{cls.time}</span>
                      <h4 className={styles.classTitle}>{cls.title}</h4>
                      <p className={styles.tutorName}>{cls.tutor}</p>
                    </div>
                  ))
                ) : (
                  <div className={styles.emptySlot}>No classes</div>
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

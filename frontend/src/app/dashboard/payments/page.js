'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Payments() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for payments
  const transactions = [
    { id: 1, service: 'Advanced Mathematics', date: 'Mar 25, 2026', amount: '$150.00', status: 'Paid' },
    { id: 2, service: 'Physics 101: Mechanics', date: 'Mar 18, 2026', amount: '$120.00', status: 'Paid' },
    { id: 3, service: 'Introduction to Python', date: 'Mar 10, 2026', amount: '$200.00', status: 'Paid' },
    { id: 4, service: 'Tutor Subscription - Monthly', date: 'Mar 01, 2026', amount: '$45.00', status: 'Paid' },
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
    return <div className={styles.loader}>Loading Payments...</div>;
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
          <div className={styles.navItemActive}>
            <span className={styles.navIcon}>💳</span> Payments
          </div>
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
            <h1>Payments</h1>
            <p>Track your transactions and billing history.</p>
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

        <section className={styles.paymentOverview}>
          <div className={styles.balanceCard}>
            <div className={styles.balanceInfo}>
              <h3>Account Balance</h3>
              <p className={styles.amount}>$0.00</p>
              <span className={styles.status}>No pending bills</span>
            </div>
            <Link href="/dashboard/payments/add" className={styles.payBtn} style={{ textDecoration: 'none' }}>
              Add Funds
            </Link>
          </div>

          <div className={styles.transactionSection}>
            <h2>Recent Transactions</h2>
            <div className={styles.transactionList}>
              {transactions.map((tx) => (
                <div key={tx.id} className={styles.txRow}>
                  <div className={styles.txInfo}>
                    <p className={styles.txService}>{tx.service}</p>
                    <p className={styles.txDate}>{tx.date}</p>
                  </div>
                  <div className={styles.txAmount}>
                    <p>{tx.amount}</p>
                    <span className={styles.txStatus}>{tx.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

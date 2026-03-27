'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function AddFunds() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
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

  const handleAddFunds = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    setProcessing(true);
    // Mock payment processing delay
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      // In a real app, we would update the balance in the backend here
    }, 2000);
  };

  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (success) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.successWrapper}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>✓</div>
            <h1>Payment Successful!</h1>
            <p>${parseFloat(amount).toFixed(2)} has been added to your account.</p>
            <Link href="/dashboard/payments" className={styles.primaryBtn}>
              Back to Payments
            </Link>
          </div>
        </div>
      </div>
    );
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
          <Link href="/dashboard/payments" className={styles.navItemActive} style={{ textDecoration: 'none' }}>
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
            <div className={styles.breadcrumb}>
              <Link href="/dashboard/payments">Payments</Link> / Add Funds
            </div>
            <h1>Add Funds</h1>
            <p>Securely top up your account balance.</p>
          </div>
        </header>

        <section className={styles.checkoutSection}>
          <div className={styles.checkoutCard}>
            <form onSubmit={handleAddFunds} className={styles.checkoutForm}>
              <div className={styles.formGroup}>
                <label>Amount to Add ($)</label>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)}
                  step="0.01"
                  required
                />
              </div>

              <div className={styles.paymentMethods}>
                <label>Select Payment Method</label>
                <div className={styles.methodGrid}>
                  <div 
                    className={`${styles.methodCard} ${paymentMethod === 'card' ? styles.methodActive : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <span className={styles.methodIcon}>💳</span>
                    <span>Credit Card</span>
                  </div>
                  <div 
                    className={`${styles.methodCard} ${paymentMethod === 'paypal' ? styles.methodActive : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <span className={styles.methodIcon}>🅿️</span>
                    <span>PayPal</span>
                  </div>
                </div>
              </div>

              <button type="submit" className={styles.confirmBtn} disabled={processing}>
                {processing ? 'Processing...' : `Confirm & Pay $${amount || '0.00'}`}
              </button>
              
              <p className={styles.securityNote}>
                🔒 Secure, encrypted transaction.
              </p>
            </form>
          </div>

          <div className={styles.summaryCard}>
            <h3>Payment Summary</h3>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${parseFloat(amount || 0).toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Transaction Fee</span>
              <span>$0.00</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total Amount</span>
              <span>${parseFloat(amount || 0).toFixed(2)}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

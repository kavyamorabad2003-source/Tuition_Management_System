'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Settings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/signin');
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        fullName: parsedUser.full_name,
        email: parsedUser.email,
        role: parsedUser.role
      });
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/signin');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, full_name: formData.fullName };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    setSuccessMessage('Password changed successfully!');
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return <div className={styles.loader}>Loading Settings...</div>;
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
          <div className={styles.navItemActive}>
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
        {successMessage && (
          <div className={styles.successToast}>
            {successMessage}
          </div>
        )}
        
        <header className={styles.header}>
          <div className={styles.headerTitle}>
            <h1>Settings</h1>
            <p>Manage your account preferences and profile.</p>
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

        <section className={styles.settingsSection}>
          <div className={styles.settingsCard}>
            <h2>Profile Information</h2>
            <form onSubmit={handleSaveProfile} className={styles.settingsForm}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName} 
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email} 
                  readOnly
                  className={styles.readOnlyInput}
                />
                <small>Email cannot be changed.</small>
              </div>
              <div className={styles.formGroup}>
                <label>Account Role</label>
                <input 
                  type="text" 
                  value={formData.role} 
                  readOnly 
                  className={styles.readOnlyInput}
                />
              </div>
              <button type="submit" className={styles.saveBtn}>Save Changes</button>
            </form>
          </div>

          <div className={styles.settingsCard}>
            <h2>Security</h2>
            <p className={styles.cardDesc}>Update your password and security settings.</p>
            
            {!showPasswordForm ? (
              <button 
                className={styles.secondaryBtn}
                onClick={() => setShowPasswordForm(true)}
              >
                Change Password
              </button>
            ) : (
              <form onSubmit={handleSavePassword} className={styles.settingsForm}>
                <div className={styles.formGroup}>
                  <label>Current Password</label>
                  <input 
                    type="password" 
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>New Password</label>
                  <input 
                    type="password" 
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Confirm New Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className={styles.formActions}>
                  <button type="submit" className={styles.saveBtn}>Update Password</button>
                  <button 
                    type="button" 
                    className={styles.cancelBtn}
                    onClick={() => setShowPasswordForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

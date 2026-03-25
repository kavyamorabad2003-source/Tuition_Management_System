import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="Tuition Flow Logo" 
            width={32} 
            height={32} 
            className={styles.logoIcon}
          />
          Tuition<span>Flow</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/signin" className={styles.loginBtn}>Sign In</Link>
          <Link href="/signup" className={styles.signupBtn}>Get Started</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Manage Your Education <br />
            <span>With Ease</span>
          </h1>
          <p className={styles.subtitle}>
            The all-in-one platform for students, tutors, and parents to track progress, 
            schedule classes, and manage payments seamlessly.
          </p>
          <div className={styles.cta}>
            <Link href="/signup" className={styles.primaryBtn}>Create an Account</Link>
            <Link href="/about" className={styles.secondaryBtn}>Learn More</Link>
          </div>
        </div>
        <div className={styles.heroBackground}></div>
      </section>

      <section className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📚</div>
          <h3>Smart Scheduling</h3>
          <p>Organize your classes with an intuitive calendar system.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>💰</div>
          <h3>Easy Payments</h3>
          <p>Track and manage tuition fees with automated billing.</p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📈</div>
          <h3>Progress Tracking</h3>
          <p>Monitor student performance with detailed analytics.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2026 Tuition Management System. All rights reserved.</p>
      </footer>
    </main>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

export default function About() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="Tuition Flow Logo" 
            width={32} 
            height={32} 
            className={styles.logoIcon}
          />
          Tuition<span>Flow</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/signin" className={styles.loginBtn}>Sign In</Link>
          <Link href="/signup" className={styles.signupBtn}>Get Started</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Empowering <span>Education</span>
          </h1>
          <p className={styles.subtitle}>
            We believe that organizing education should be as seamless and transparent as learning itself. 
            TuitionFlow bridges the gap between students, tutors, and institutions.
          </p>
        </div>
        <div className={styles.heroBackground}></div>
      </section>

      <section className={styles.mission}>
        <div className={styles.missionGrid}>
          <div className={styles.missionCard}>
            <div className={styles.icon}>🎯</div>
            <h2>Our Mission</h2>
            <p>To eliminate administrative friction so educators can focus purely on teaching and students can focus purely on learning.</p>
          </div>
          
          <div className={styles.missionCard}>
            <div className={styles.icon}>💡</div>
            <h2>Our Vision</h2>
            <p>A world where educational management is decentralized, beautifully intuitive, and universally accessible.</p>
          </div>

          <div className={styles.missionCard}>
            <div className={styles.icon}>🔒</div>
            <h2>Our Values</h2>
            <p>Security, transparency, and relentlessly pursuing the most premium user experiences in the EdTech space.</p>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaBox}>
          <h2>Ready to transform your educational journey?</h2>
          <p>Join thousands of students and tutors already using TuitionFlow.</p>
          <Link href="/signup" className={styles.primaryBtn}>Create an Account Today</Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2026 Tuition Management System. All rights reserved.</p>
      </footer>
    </main>
  );
}

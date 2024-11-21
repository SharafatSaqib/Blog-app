// Footer.js
'use client';

import styles from './Footer.module.scss'; // Import SCSS for footer styling

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Footer Links Section */}
        <div className={styles.footerLinks}>
          <a href="/about" className={styles.footerLink}>About Us</a>
          <a href="/" className={styles.footerLink}>Privacy Policy</a>
          <a href="/" className={styles.footerLink}>Contact Us</a>
        </div>

        {/* Social Media Icons Section */}
        <div className={styles.footerSocial}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF7etH_u0DYh8Nsksf8rRdUiys8ZM2TCOjA&s" alt="Twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png" alt="Instagram" />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <p className={styles.footerCopyright}>
        &copy; {new Date().getFullYear()} My Website. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

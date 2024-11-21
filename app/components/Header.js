'use client';

import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { logOut } from '../../store/reducers/userSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false); // State to track if the component has mounted

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true after the component mounts on the client side
  }, []);

  const handleLogout = () => {
    dispatch(logOut()); // Dispatch the logOut action to update Redux state
    router.push('/'); // Navigate to the home page after logout
  };

  if (!isMounted) {
    return null; // Prevent rendering until the client-side hydration is complete
  }

  return (
    <header className={styles.header}>
      <nav className={styles['header-nav']}>
        {/* Left Side Menu */}
        <ul className={styles['header-menu']}>
          <li className={styles['header-menu-item']}>
            <Link href="/" className={styles['header-link']}>
              Home
            </Link>
          </li>
          <li className={styles['header-menu-item']}>
            <Link href="/about" className={styles['header-link']}>
              About Us
            </Link>
          </li>
        </ul>

        {/* Right Side Login/Logout */}
        <div className={styles['header-login-logout']}>
          {user ? (
            <>
              <li className={styles['header-menu-item']}>
                <Link href="/dashboard" className={styles['header-link']}>
                  Dashboard
                </Link>
              </li>
              <li className={styles['header-menu-item']}>
                <Link href="/blogs" className={styles['header-link']}>
                  Blogs
                </Link>
              </li>
              <button className={styles['header-button']} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <li className={styles['header-menu-item']}>
              <Link href="/login" className={styles['header-link']}>
                Login
              </Link>
            </li>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

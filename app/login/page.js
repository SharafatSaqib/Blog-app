// Login.js
'use client';

import { signInWithGoogle } from '../../lib/firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/userSlice';
import { useRouter } from 'next/navigation';  // Use Next.js App Router's useRouter hook
import { FaGoogle } from 'react-icons/fa'; // Import Google icon from React Icons
import styles from './Login.module.scss'; // Import SCSS module

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      dispatch(setUser({ user })); // Store user info in Redux
      router.push('/dashboard'); // Navigate to the dashboard after successful login
    } catch (error) {
      console.error('Error during Google login', error);
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles['login-title']}>Login with Google</h1>
      <button 
        className={styles['login-button']} 
        onClick={handleGoogleLogin}>
        <FaGoogle className={styles['google-icon']} /> Login with Google
      </button>
    </div>
  );
}

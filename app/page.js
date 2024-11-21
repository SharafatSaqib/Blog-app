'use client';

import { useState, useEffect } from 'react';
import { fetchAllPosts } from '../lib/api';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import styles from './HomePage.module.scss';
import Head from 'next/head';
import Footer from './components/Footer'; 

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user.user); 
  const router = useRouter();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchAllPosts(1);  
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    loadPosts();
  }, []);

  const handleReadMore = (postId) => {
    if (user) {
      router.push(`/post/${postId}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className={styles.homePage}>
      <Head>
        <title>Welcome to My Blog | My Website</title>
        <meta name="description" content="Explore the latest blog posts on various topics, from tech to lifestyle, and stay updated with fresh insights." />
        <meta property="og:title" content="Welcome to My Blog | My Website" />
        <meta property="og:description" content="Explore the latest blog posts on various topics, from tech to lifestyle, and stay updated with fresh insights." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mywebsite.com" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <link rel="canonical" href="https://mywebsite.com" />
      </Head>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to Our Blog</h1>
          <p className={styles.heroSubtitle}>
            Stay informed and inspired with the latest articles on a wide range of topics. Explore fresh perspectives, insightful commentary, and actionable tips for everyday life.
          </p>
          <a href="/" className={styles.heroButton}>Explore Blog Posts</a>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className={styles.featuredPostsSection}>
        <h2 className={styles.sectionTitle}>Featured Articles</h2>
        <div className={styles.featuredPosts}>
          {posts.slice(0, 3).map((post) => (  // Show only the first 3 posts
            <div key={post._id} className={styles.featuredPost}>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className={styles.featuredPostImage}
                />
              )}
              <h3 className={styles.featuredPostTitle}>{post.title}</h3>
              <p className={styles.featuredPostDescription}>{post.description}</p>
              <button
                className={styles.readMoreLink}
                onClick={() => handleReadMore(post._id)} 
              >
                Read more
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.callToAction}>
        <h2 className={styles.ctaTitle}>Join Our Community</h2>
        <p className={styles.ctaDescription}>Be the first to know when new content is published. Join our newsletter for updates, tips, and exclusive content.</p>
        <a href="/" className={styles.ctaButton}>Subscribe Now</a>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchPosts } from '../../lib/api';  // Assume fetchPosts is set up to call the API correctly
import styles from './Dashboard.module.scss';
import Link from 'next/link';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const user = useSelector((state) => state.user.user); // Get logged-in user

  // Load posts with pagination when the page changes or user is logged in
  useEffect(() => {
    if (user && user.uid) {
      const loadUserPosts = async () => {
        setLoading(true);
        try {
          // Fetch posts for the current page filtered by user ID (uid)
          const data = await fetchPosts(currentPage, user.uid);  // Pass user.uid to fetch posts for the logged-in user
          setPosts(data.posts);
          setTotalPages(data.totalPages);  // Set the total pages based on API response
        } catch (error) {
          console.error('Error fetching user posts:', error);
        }
        setLoading(false);
      };

      loadUserPosts();
    } else {
      console.log('User not logged in');
    }
  }, [user, currentPage]); // Re-fetch posts when page or user changes

  return (
    <div className={styles.dashboard}>
      <h1 className={styles['dashboard-title']}>My Blogs</h1>

      {/* Create Post Button */}
      <div className={styles['create-post-container']}>
        <Link href="/dashboard/create-post">
          <button className={styles['create-post-btn']}>Create New Blog</button>
        </Link>
      </div>

      {loading ? (
        <p className={styles['dashboard-loading']}>Loading blogs...</p>
      ) : (
        <div className={styles['dashboard-posts']}>
          {posts.length === 0 ? (
            <p className={styles['dashboard-no-posts']}>
              You have not created any blogs yet.
            </p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className={styles['dashboard-post']}>
                {/* Display the post image */}
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className={styles['dashboard-post-image']}
                  />
                )}
                <h2 className={styles['dashboard-post-title']}>{post.title}</h2>
                <p className={styles['dashboard-post-description']}>{post.description}</p>
                <a href={`/post/${post._id}`} className={styles['dashboard-post-link']}>
                  Read more
                </a>
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination controls */}
      <div className={styles.paginationControls}>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className={styles.paginationInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={styles.paginationButton}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

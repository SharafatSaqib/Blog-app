'use client';

import { useState, useEffect } from 'react';
import { fetchAllPosts } from '../../lib/api';
import styles from './BlogsPage.module.scss'; // Import SCSS module
import Head from 'next/head'; // Import Next.js Head component for SEO

export default function Page() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch posts when the page number changes
  const loadPosts = async (page) => {
    setLoading(true);
    try {
      const data = await fetchAllPosts(page); // Fetch all posts (no userId filter)
      setPosts(data.posts);
      setTotalPages(data.totalPages); // Update the total pages
      setCurrentPage(data.currentPage); // Update current page
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  // Load posts when component mounts or page changes
  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.blogPage}>
      {/* Dynamic meta tags for SEO */}
      <Head>
        <title>Blog Posts | My Website</title>
        <meta name="description" content="Explore the latest blog posts on My Website. Stay updated with the newest articles on various topics." />
        <meta property="og:title" content="Blog Posts | My Website" />
        <meta property="og:description" content="Explore the latest blog posts on My Website. Stay updated with the newest articles on various topics." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mywebsite.com" />
        <meta property="og:image" content="/images/og-image.jpg" />
        <link rel="canonical" href="https://mywebsite.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Blog Posts",
              "description": "Explore the latest blog posts on My Website.",
              "url": "https://mywebsite.com",
            }),
          }}
        />
        {currentPage > 1 && <link rel="prev" href={`https://mywebsite.com?page=${currentPage - 1}`} />}
        {currentPage < totalPages && <link rel="next" href={`https://mywebsite.com?page=${currentPage + 1}`} />}
      </Head>

      <h1 className={styles.blogTitle}>All Blogs</h1>

      {loading && <p className={styles.loadingMessage}>Loading...</p>}

      {/* Display posts */}
      <div className={styles.blogPosts}>
        {posts.map((post) => (
          <div key={post._id} className={styles.blogPost}>
            {post.image && (
              <img
                src={post.image} // Assuming the image URL is available in the post object
                alt={post.title}
                className={styles.blogPostImage}
              />
            )}
            <h2 className={styles.blogPostTitle}>{post.title}</h2>
            <p className={styles.blogPostDescription}>{post.description}</p>
            <a href={`/post/${post._id}`} className={styles.readMoreLink}>
              Read more
            </a>
          </div>
        ))}
      </div>

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

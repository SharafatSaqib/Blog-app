'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; 
import axios from 'axios'; // Axios for API requests
import { useDispatch, useSelector } from 'react-redux'; 
import { likePost, unlikePost } from '../../../store/reducers/userSlice'; 
import styles from './Post.module.scss';
import Head from 'next/head'; 

export default function Post() {
  const dispatch = useDispatch();
  const { user, likedPosts } = useSelector((state) => state.user); 

  const [post, setPost] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 

  const pathname = usePathname(); 
  const id = pathname?.split('/').pop(); 

 
  const isLiked = likedPosts.includes(id);

  // Fetch post by id
  useEffect(() => {
    if (id) {
      const fetchPostById = async () => {
        setLoading(true);
        setError('');
        try {
          const response = await axios.get(`/api/posts/${id}`);
          setPost(response.data); 
        } catch (err) {
          console.error('Error fetching post:', err);
          setError('Failed to load post. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchPostById();
    }
  }, [id]); 

  // Handle like/unlike
  const handleLike = () => {
    if (isLiked) {
      dispatch(unlikePost(id)); 
    } else {
      dispatch(likePost(id));
    }
  };

  return (
    <div className={styles['post-container']}>
      {post && (
        <Head>
          <title>{post.title} | My Blog</title>
          <meta name="description" content={post.description} />
          <meta property="og:title" content={post.title} />
          <meta property="og:description" content={post.description} />
          <meta property="og:image" content={post.image} />
          <meta property="og:type" content="article" />
          <meta property="og:url" content={`https://myblog.com/posts/${id}`} />
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.description,
                author: post.author || 'Unknown',
                datePublished: post.datePublished || new Date().toISOString(),
                image: post.image,
                mainEntityOfPage: `https://myblog.com/posts/${id}`,
              }),
            }}
          />
        </Head>
      )}

      {loading ? (
        <p className={styles['loading-message']}>Loading post...</p>
      ) : error ? (
        <p className={styles['error-message']}>{error}</p>
      ) : post ? (
        <>
          <h1 className={styles['post-title']}>{post.title || 'No Title'}</h1>
          {post.image ? (
            <img
              src={post.image}
              alt={post.title || 'Post Image'}
              className={styles['post-image']}
            />
          ) : (
            <p className={styles['image-placeholder']}>No Image Available</p>
          )}
          <p className={styles['post-description']}>{post.description}</p>
          <div className={styles['post-content']}>{post.content}</div>

          <div className={styles['like-button-container']}>
            <button
              className={styles['like-button']}
              onClick={handleLike}
              aria-label={isLiked ? 'Unlike Post' : 'Like Post'}
            >
              {isLiked ? 'Unlike' : 'Like'}
            </button>
          </div>
        </>
      ) : (
        <p className={styles['not-found-message']}>Post not found</p>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import styles from './CreatePost.module.scss'; // Import SCSS module
import axios from 'axios';
import { API_ENDPOINTS } from '../../../utils/constants';

export default function CreatePost() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user); // Get logged-in user

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // For image file
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const [error, setError] = useState(null); // For handling error messages

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError(null);
    
    // Form validation
    if (!title || !description || !content) {
      setError('All fields are required.');
      return;
    }

    if (!image) {
      setError('Please upload an image.');
      return;
    }

    // Prepare the form data to send
    const postData = new FormData();
    postData.append('title', title);
    postData.append('description', description);
    postData.append('content', content);
    postData.append('userId', user.uid); // Include user ID in post data
    postData.append('image', image); // Append the image if selected

    try {
      setIsSubmitting(true); // Disable the button while submitting
      // Send the post data and image to the backend
      const response = await axios.post(API_ENDPOINTS.POSTS, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/dashboard'); // Redirect to dashboard after creating post
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false); // Re-enable the button after submission
    }
  };

  return (
    <form className={styles['create-post-form']} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>} {/* Show error message */}
      <input
        type="text"
        className={styles['create-post-input']}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        className={styles['create-post-textarea']}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <textarea
        className={styles['create-post-textarea']}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <input
        type="file"
        className={styles['create-post-input']}
        onChange={handleImageChange}
        accept="image/*"
        required
      />
      <button 
        className={styles['create-post-button']} 
        type="submit" 
        disabled={isSubmitting} // Disable button during submission
      >
        {isSubmitting ? 'Creating Post...' : 'Create Post'}
      </button>
    </form>
  );
}

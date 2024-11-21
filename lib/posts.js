import Post from '../models/Post';  // Import the Post model
import mongoose from 'mongoose';

// Function to fetch post by ID (using _id from MongoDB)
export const getPostById = async (id) => {
  try {
    // Ensure the ID is a valid MongoDB ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid post ID');
    }

    // Query the database using findById
    const post = await Post.findById(id);  

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  } catch (error) {
    console.error('Error fetching post by id:', error.message);
    throw new Error(`Error fetching post by id: ${error.message}`);
  }
};

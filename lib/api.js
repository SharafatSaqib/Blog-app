

import { BASE_URL } from '../utils/constants';
// export const createPost = async (title, description, content) => {
//     const response = await fetch(`${BASE_URL}/api/posts`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         title,
//         description,
//         content,
//       }),
//     });
  
//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.error || 'Failed to create post');
//     }
  
//     return data;
//   };
  
  

  export const fetchPosts = async (page = 1, userId, limit = 5) => {
    // Ensure page is always a positive integer and limit is specified
    const pageNumber = Math.max(1, page); // Default to page 1 if page is invalid
    const pageLimit = Math.max(1, limit); // Default to limit 5 if limit is invalid
    
    const response = await fetch(
      `${BASE_URL}/api/posts?page=${pageNumber}&userId=${userId}&limit=${pageLimit}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
  
    const data = await response.json();
    return data;
  };
  // Update the `fetchPosts` function to fetch all posts (no userId filter)
export const fetchAllPosts = async (page = 1, limit = 5) => {
  const pageNumber = Math.max(1, page); // Ensure the page number is valid
  const pageLimit = Math.max(1, limit); // Ensure the limit is valid

  const response = await fetch(
    `${BASE_URL}/api/posts?page=${pageNumber}&limit=${pageLimit}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data = await response.json();
  return data;
};

  



  
  
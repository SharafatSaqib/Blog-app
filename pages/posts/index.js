import clientPromise from '../../lib/mongodb';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'public/uploads';
    // Ensure the upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

// Multer instance
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const isValidType = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);
    if (isValidType) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .jpg, or .png files are allowed.'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
});

// Separate GET method handler
async function getPostsHandler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('posts');
  
  const { page = 1, limit = 5, userId } = req.query;
  const skip = (page - 1) * limit;

  try {
    const query = userId ? { userId } : {};
    const posts = await collection.find(query).skip(skip).limit(Number(limit)).toArray();
    const totalPosts = await collection.countDocuments(query);

    res.status(200).json({
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts', details: error.message });
  }
}

// Separate POST method handler (including file upload handling)
async function postPostHandler(req, res) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('posts');

  const uploadMiddleware = upload.single('image');
  uploadMiddleware(req, res, async (err) => {
    if (err) {
      console.error('Error during image upload:', err.message);
      return res.status(400).json({ error: err.message });
    }

    try {
      const { title, description, content, userId } = req.body;

      if (!title || !description || !content || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const image = req.file ? `/uploads/${req.file.filename}` : null;

      if (!image) {
        return res.status(400).json({ error: 'Image upload failed or missing.' });
      }

      const post = {
        title,
        description,
        content,
        userId,
        image, // Save image path
        createdAt: new Date(),
      };

      const result = await collection.insertOne(post);
      res.status(201).json({ post: { ...post, _id: result.insertedId } });
    } catch (error) {
      console.error('Error during POST', error.message);
      res.status(500).json({ error: 'Failed to create post', details: error.message });
    }
  });
}

// API handler
export default async function handler(req, res) {
  // Apply CORS middleware
  await new Promise((resolve, reject) => cors(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result))));

  if (req.method === 'GET') {
    return getPostsHandler(req, res);
  } else if (req.method === 'POST') {
    return postPostHandler(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

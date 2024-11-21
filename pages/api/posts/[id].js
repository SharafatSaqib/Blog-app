import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export  async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid post ID' });
  }

  try {
    const client = await clientPromise; // Ensure clientPromise resolves correctly
    const db = client.db(process.env.MONGO_URI); 

    const post = await db.collection('posts').findOne({ _id: new ObjectId(id) });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post:', error.message);
    res.status(500).json({ error: 'Failed to fetch post', details: error.message });
  }
}

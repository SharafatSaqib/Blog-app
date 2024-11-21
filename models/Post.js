import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  slug: String, // Optional if you're using slugs
  userId: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;

const Blog = require("../models/Blog");

async function createBlog(req, res) {
  try {
    const { title, content } = req.body;
    const blog = await Blog.create({ title, content, author: req.userId });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find({ author: req.userId });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateBlog(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: id, author: req.userId }, // Ensure the blog belongs to the authenticated user
      { title, content },
      { new: true },
    );
    if (!updatedBlog) {
      return res
        .status(404)
        .json({ error: "Blog not found or unauthorized to update" });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findOneAndDelete({
      _id: id,
      author: req.userId,
    }); // Ensure the blog belongs to the authenticated user
    if (!deletedBlog) {
      return res
        .status(404)
        .json({ error: "Blog not found or unauthorized to delete" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog };

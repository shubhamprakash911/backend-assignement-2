const asyncHandler = require("../middlewares/asyncHandlerMiddleware");
const Blog = require("../model/blogModel");

//get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.findAll();
  res.json({ message: "All Blogs successfully retrieve", data: blogs });
});

// create a blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;
  const blog = await Blog.create({ title, category, content });
  res.json({ message: "A blog successfully created", data: blog });
});

// delete a blog
const deleteBlog = asyncHandler(async (req, res) => {
  const deletedBlog = await Blog.destroy({ where: { id: req.params.blogId } });
  res.json({ message: "A blog successfully deleted", data: deletedBlog });
});

// update a blog
const updateBlog = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;
  const blogId = req.params.blogId;

  // Find the blog by ID
  const blog = await Blog.findByPk(blogId);

  console.log(blog);

  // Check if the blog exists
  if (!blog) {
    res.status(404);
    throw new Error("User not found");
  }

  const updatedBlog = await blog.update({
    title: title || blog.title,
    category: category || blog.category,
    content: content || blog.content,
  });
  res.json({ message: "A blog successfully updated", data: updatedBlog });
});

module.exports = { getAllBlogs, createBlog, deleteBlog, updateBlog };

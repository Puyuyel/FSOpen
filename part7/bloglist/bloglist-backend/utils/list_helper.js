const _ = require("lodash");
const User = require("../models/user");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favorite = blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite;
  }, blogs[0]);
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const count = _.countBy(blogs, "author");
  const mostBlogs = _.maxBy(Object.keys(count), (author) => count[author]);

  return { author: mostBlogs, blogs: count[mostBlogs] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const likes = blogs.reduce((accumulator, blog) => {
    accumulator[blog.author] = (accumulator[blog.author] || 0) + blog.likes;
    return accumulator;
  }, {});

  const mostLikes = _.maxBy(Object.keys(likes), (author) => likes[author]);

  return { author: mostLikes, likes: likes[mostLikes] };
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb,
};

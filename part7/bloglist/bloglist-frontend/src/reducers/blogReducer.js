import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    replace(state, action) {
      const id = action.payload.id;
      const replacedBlog = action.payload;
      return state.map((b) => (b.id !== id ? b : replacedBlog));
    },
    remove(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

const { appendBlog, setBlogs, replace, remove } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog);
    dispatch(appendBlog(createdBlog));
  };
};

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.get(id);
    const likedBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(id, likedBlog);
    dispatch(replace(updatedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(remove(id));
  };
};

export const commentBlog = (blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(blogObject);
    dispatch(replace(updatedBlog));
  };
};

export default blogSlice.reducer;

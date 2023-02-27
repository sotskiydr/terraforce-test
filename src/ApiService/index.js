import axios from 'axios';

const BASE_URL = 'https://yourtestapi.com/api';

export const getPosts = async () => {
  const posts = await axios.get(`${BASE_URL}/posts/`);
  return posts.data;
};

export const createPost = async (values) => {
  const post = await axios.post(`${BASE_URL}/posts/`, values);
  return post.data;
};

export const updatePost = async ({ id, values }) => {
  const post = await axios.put(`${BASE_URL}/posts/${id}`, values);
  return post.data;
};

export const deletePost = async (id) => {
  const post = await axios.delete(`${BASE_URL}/posts/${id}`);
  return post.data;
};

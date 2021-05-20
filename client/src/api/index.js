import axios from 'axios';

const url = 'http://localhost:5000/posts';

export const fecthPosts = () => axios.get(url);
export const createPosts = (newPost)=>axios.post(url,newPost);
export const updatePosts = (_id,updatedPost)=>axios.patch(`${url}/${_id}`,updatedPost);
export const deletePosts = (id)=>axios.delete(`${url}/${id}`);
export const likePosts = (id)=>axios.patch(`${url}/${id}/Like`);
import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:5000'}) ; 
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}` ;
    }
    return req ; 
} );

export const fetchPosts = () => API.get('/posts') ; 
export const createPost = (data) => API.post('/posts' , data) ; 
export const updatePost = (id, data ) => API.put(`/posts/${id}` , data);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.put(`/posts/${id}/like`);
export const signIn = (formData) => API.post(`/user/signIn` , formData) ; 
export const signUp = (formData) => API.post(`/user/signUp` , formData) ; 
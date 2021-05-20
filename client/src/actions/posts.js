import * as api from '../api';
import {TYPES} from '../constants/actionTypes';

//Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fecthPosts();
        dispatch({ type: TYPES.FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }

}

export const createPosts = (post) => async(dispatch) => {
    try {
        const {data} =  await api.createPosts(post);

        dispatch({type:TYPES.CREATE,payload:data});
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePosts = (id,post)=>async(dispatch)=>{
    try {
       const {data} = await api.updatePosts(id,post);

       dispatch({type:TYPES.UPDATE,payload:data});

    } catch (error) {
        console.log(error.message);
    }
}

export const deletePost = (id)=>async(dispatch)=>{
    try {
        await api.deletePosts(id);

        dispatch({type:TYPES.DELETE,payload:id})
    } catch (error) {
        
    }
}

export const likePost = (id)=>async(dispatch)=>{
    try {
        const {data} = await api.likePosts(id);
 
        dispatch({type:TYPES.UPDATE,payload:data});
 
     } catch (error) {
         console.log(error.message);
     }
}
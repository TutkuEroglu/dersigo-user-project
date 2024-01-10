import { AppDispatch } from "@/redux/store";
import { PostInterface } from "@/types/post-interface";

export const FILL_POSTS = "FILL_POSTS";
export const ADD_POSTS = "ADD_POSTS";
export const DELETE_POSTS = "DELETE_POSTS";
export const FILTER_POSTS = "FILTER_POSTS";

export const setPosts = (payload: PostInterface) => (dispatch: AppDispatch) => {
    dispatch({
        type: FILL_POSTS,
        payload
    })
}

export const addPosts = (payload: PostInterface) => (dispatch: AppDispatch) => {
    dispatch({
        type: ADD_POSTS,
        payload
    })
}

export const deletePosts = (payload: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: DELETE_POSTS,
        payload
    })
}

export const filterPosts = (payload: string) => (dispatch: AppDispatch) => {
    dispatch({
        type: FILTER_POSTS,
        payload
    })
}
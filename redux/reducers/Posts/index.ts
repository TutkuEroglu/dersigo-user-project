import { getStorage, setStorage } from "@/Utils/storageUtils";
import { ADD_POSTS, DELETE_POSTS, FILL_POSTS, FILTER_POSTS } from "@/redux/actions/Posts";

export interface Post {
    id: number;
    text: string;
    owner: {
        firstName: string;
        lastName: string;
    };
}

const initialState = getStorage("posts") || {
    originalData: [],
    data: [],
    total: -1,
    page: -1,
    limit: -1
};

const PostsReducer = (state = initialState, action: { type: string, payload: any }) => {
    let newState;
    switch (action.type) {
        case FILL_POSTS:
            newState = { 
                ...state, 
                originalData: action.payload.data,
                ...action.payload 
            };
            break;
        case ADD_POSTS:
            newState = {
                ...state,
                data: [action.payload, ...state.data]
            };
            break;
        case DELETE_POSTS:
            newState = {
                ...state,
                data: state.data.filter((post: Post) => post.id !== action.payload)
            };
            break;
        case FILTER_POSTS:
            if (action.payload === '') {
                newState = {
                    ...state,
                    data: state.originalData
                };
            } else {
                const lowercasedTerm = action.payload.toLowerCase();
                newState = {
                    ...state,
                    data: state.data.filter((post: Post) => 
                        post.text.toLowerCase().includes(lowercasedTerm) ||
                        post.owner.firstName.toLowerCase().includes(lowercasedTerm) ||
                        post.owner.lastName.toLowerCase().includes(lowercasedTerm)
                    )
                };
            }
            break;
        default:
            newState = state;
            break;
    }
    setStorage("posts", newState);
    return newState;
};

export default PostsReducer;
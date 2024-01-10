import {getStorage, setStorage, removeStorage} from "@/Utils/storageUtils";
import {
  EDIT_USER,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../../actions/Auth/authActions";

const user = getStorage("user") || null;

const initialState = user
  ? {
    isLoggedIn: true,
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    registerDate: user.registerDate,
    updatedDate: user.updatedDate
  }
  : {
    isLoggedIn: false,
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    registerDate: "",
    updatedDate: ""
  };

const AuthReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
        const newState = {
          isLoggedIn: true,
          ...action.payload
        };
        setStorage("user", newState);
        return newState;
      }
      case EDIT_USER: {
        const { firstName, lastName} = action.payload;
        const newState = {
          ...state,
          firstName,
          lastName,
        };
        setStorage("user", newState);
        return newState;
      }
  case LOGOUT:
    removeStorage("user");
    return {
      ...state,
      isLoggedIn: false,
      firstName: "",
      lastName: "",
      email: "",
      id: 0,
      registerDate: "",
      updatedDate: ""
    };
  default:
    return state;
  }
};

export default AuthReducer;
import { PostInterface } from "./post-interface";

export interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
  }

  export interface Location {
    street: string;
    city: string;
    state: string;
    country: string;
    timezone: string;
  }

  export interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    userInfo: Partial<User>;
    onSave: (data: { [key: string]: any }) => void;
  }
  
export interface NewUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
  }


  export interface UserPreview {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
  }

  export interface UserFull extends UserPreview {
    gender: string;
    email: string;
    dateOfBirth: string;
    registerDate: string;
    phone: string;
    location: Location;
  }

  export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    registerDate: string;
    updatedDate: string;
    picture?: any;
    location?: Location;
  }

  export interface UserState {
    user: User | null;
    posts: PostInterface[];
  }
  

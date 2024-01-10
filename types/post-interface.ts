import { User, UserPreview } from "./user-interface";

export interface PostInterface {
  data: PostInfoInterface[];
  total: number;
  page: number;
  limit: number;
}

export interface ReduxPostInterface {
  originalData: [];
  data: PostInfoInterface[];
  total: number;
  page: number;
  limit: number;
}

export interface PostInfoInterface {
  id: string;
  image: string;
  likes: number;
  link: string;
  tags: string[];
  text: string;
  publishDate: string;
  owner: PostOwner
}

export interface EditPostPageProps {
  postInfo: PostInfoInterface;
}

export interface PostOwner {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  title?: string;
}

export interface NewPost {
  text: string;
  image: string;
  likes: number;
  tags: string[];
  owner: string | null;
}

export interface ProfilePageViewProps {
  userInfo: User;
  postInfo: {
    data: PostInterface[];
    limit: number;
    page: number;
    total: number;
  };
}

export interface PostInfoProps {
  postInfo: {
    data: PostInterface[];
  };
}

export interface PostCreate {
  text: string;
  image: string;
  likes: number;
  tags: string[];
  owner: string;
}

export interface PostPreview {
  id: string;
  text: string;
  image: string;
  likes: number;
  tags: string[];
  publishDate: string;
  owner: UserPreview;
}
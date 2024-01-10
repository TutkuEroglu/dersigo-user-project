import { PostInterface } from "./post-interface";

  export interface NavbarProps {
    id?: string;
    onSearch: (searchTerm: string) => void;
  }

  export interface HomePageViewProps {
    list: PostInterface;
  }

  export interface TagPageViewProps {
    postInfo: PostInterface;
  }
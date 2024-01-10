interface User {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
  }
  
  interface Post {
    id: string;
    text: string;
    owner: User;
  }
  
  interface UserState {
    user: User | null;
    posts: Post[];
  }
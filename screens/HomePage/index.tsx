import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "@/styles/Home.module.css"
import NewPostPageView from "../newPost";
import Navbar from "@/components/navbar"
import { HomePageViewProps } from "@/types/Global";
import { usePostActions } from "@/Utils/postHelpers/deletePost";
import PostItem from "@/components/PostItem";
import { useAppSelector } from "@/Utils/reduxHelpers/useAppSelector";
import { PostInfoInterface } from "@/types/post-interface";
import { filterPosts, setPosts } from "@/redux/actions/Posts";
import { useAppDispatch } from "@/Utils/reduxHelpers/useAppDispatch";
import UserForm from "../registerPage";

const HomePageView: FunctionComponent<HomePageViewProps> = ({list}) => {
  const dispatch = useAppDispatch();
  const { handleDeletePost } = usePostActions();
  const user = useAppSelector((state) => state.user);
  const {data: posts} = useAppSelector((state) => state.posts);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.id && list?.data[0]?.id) {
      setLoading(false);
    }
  }, [user, list]);

  const handleSearch = (term: string) => {
    dispatch(filterPosts(term));
  };

  useEffect(() => {
    dispatch(setPosts(list));
  }, [list, dispatch]);
  
  return (
    <>
    {isLoading ? <UserForm/> : 
    <div className={styles.PageContainer}>
      <NewPostPageView/>
       <Navbar id={user?.id} onSearch={handleSearch}/>
       {posts?.map((post: PostInfoInterface) => (
        <PostItem 
          key={post.id} 
          post={post} 
          isOwner={user?.id === post.owner.id} 
          onDeletePost={handleDeletePost}
        />
      ))}
    </div>
    }
    </>
  )
}

export default HomePageView;

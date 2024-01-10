import React, { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css"
import { TagPageViewProps } from "@/types/Global";
import { usePostActions } from "@/Utils/postHelpers/deletePost";
import { convertDate } from "@/Utils/dateHelpers/convertDate";
import { useAppSelector } from "@/Utils/reduxHelpers/useAppSelector";
import Navbar from "@/components/navbar";
import { filterPosts } from "@/redux/actions/Posts";
import { useAppDispatch } from "@/Utils/reduxHelpers/useAppDispatch";

const TagPageView: FunctionComponent<TagPageViewProps> = ({postInfo}) => {
  const user = useAppSelector((state) => state.user);
  const { handleDeletePost } = usePostActions();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.id && postInfo?.data[0].id) {
      setLoading(false);
    }
  }, [user, postInfo]);

  const handleSearch = (term: string) => {
    dispatch(filterPosts(term));
  };
  
  return (
    <>
    {isLoading ?  <div>loading</div> :
  <div className={styles.PageContainer}>
    <Navbar id={user?.id} onSearch={handleSearch}/>
    {postInfo?.data.map((post) => (
      <div key={post.id} className={styles.postContainer}>
        <div className={styles.postHeader}>
          <div className={styles.profilePictureWrapper}>
            <Image
              className={styles.profilePicture}
              src={post.owner.picture || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
              width={40}
              height={40}
              alt={`${post.owner.firstName} ${post.owner.lastName}`}
            />
          </div>
          <div className={styles.postInfo}>
            <strong className={styles.postOwner}>
              <Link href={`/user/${post.owner.id}`}>
                {`${post.owner.firstName} ${post.owner.lastName}`}
              </Link>
            </strong>
            <p className={styles.postDate}>{convertDate(post.publishDate)}</p>
          </div>
          {user?.id == post.owner.id && 
           <div className="dropdown">
           <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
             Ayarlar
           </button>
           <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
             <li><a className="dropdown-item" href={`/edit-post/${post.id}`}>Düzenle</a></li>
             <li><a className="dropdown-item" href="#" onClick={() => handleDeletePost(post.id)}>Sil</a></li>
           </ul>
         </div>}
        </div>
        <p className={styles.postText}>{post.text}</p>
        <div className={styles.postImageWrapper}>
          <Image className={styles.postImage} src={post.image} alt={post.text} width={470} height={450}/>
        </div>
        <div className={styles.postTags}>
          {post.tags.map((tag: string) => (
            <a key={tag} className={styles.tag} href={`/tag/${tag}/post`}>
              #{tag}
            </a>
          ))}
        </div>
        <div className={styles.likeSection}>
          <span className={styles.likeIcon}>👍</span>
          <span className={styles.likeNumber}>{post.likes} Beğeni</span>
        </div>
      </div>
    ))}
  </div>
  }
  </>
  )
}

export default TagPageView
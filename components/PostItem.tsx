import React from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/Home.module.css";
import { convertDate } from '@/Utils/dateHelpers/convertDate';
import { PostInfoInterface } from '@/types/post-interface';

interface PostItemProps {
  post: PostInfoInterface;
  isOwner: boolean;
  onDeletePost: (postId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, isOwner, onDeletePost }) => {
    return (
      <div className={styles.postContainer}>
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
          {isOwner && (
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"></button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" href={`/edit-post/${post.id}`}>Düzenle</a></li>
                <li><a className="dropdown-item" href="#" onClick={() => onDeletePost(post.id)}>Sil</a></li>
              </ul>
            </div>
          )}
        </div>
        <p className={styles.postText}>{post.text}</p>
        <div className={styles.postImageWrapper}>
          <Image className={styles.postImage} src={post.image} alt={post.text} width={470} height={450}/>
        </div>
        <div className={styles.postTags}>
          {post.tags.map((tag) => (
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
    );
  };

export default PostItem;

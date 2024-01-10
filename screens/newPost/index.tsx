import React, { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import styles from "@/styles/newPost.module.css";
import { httpInstance } from "@/config/axios.config";
import { sendMessage } from "@/components/alert";
import { NewPost } from "@/types/post-interface";
import { addPosts } from "@/redux/actions/Posts";
import { useAppSelector } from "@/Utils/reduxHelpers/useAppSelector";
import { useAppDispatch } from "@/Utils/reduxHelpers/useAppDispatch";


const NewPostPageView: FunctionComponent = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [post, setPost] = useState<NewPost>({
    text: "",
    image: "",
    likes: 0,
    tags: [],
    owner: user ? user.id : null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if(name === "tags") {
      setPost({ ...post, [name]: value.split(",").map(tag => tag.trim()) });
    } else {
      setPost({ ...post, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await httpInstance.post("/post/create", post);
      if (response.status === 200 || response.status === 201) {
        dispatch(addPosts(response.data));
        sendMessage({
          type: "success",
          title: `Başarıyla gönderi yayınlandı.`,
        });
      } else {
        sendMessage({
          type: "error",
          title: `Gönderiniz yayınlanamadı.`,
        });
      }
    } catch (error) {
      sendMessage({
        type: "error",
        title: `Gönderiniz yayınlanamadı: ${error}`,
      });
    }
    setPost({
        text: "",
        image: "",
        likes: 0,
        tags: [],
        owner: user ? user.id : null,
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Yeni Gönderi Yayınla</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Ne düşünüyorsun?</label>
          <textarea name="text" onChange={handleInputChange} value={post.text} className={styles.input} />
          <label className={styles.label}>Fotoğraf Linki</label>
          <input type="text" name="image" onChange={handleInputChange} value={post.image} className={styles.input} />
          <label className={styles.label}>Etiketler (virgülle ayır)</label>
          <input type="text" name="tags" onChange={handleInputChange} value={post.tags.join(', ')} className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <button type="submit" className={styles.button}>Yayınla</button>
        </div>
      </form>
    </div>
  );
};

export default NewPostPageView;

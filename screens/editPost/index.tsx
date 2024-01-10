import React, { ChangeEvent, FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/EditPostPage.module.css";
import { httpInstance } from "@/config/axios.config";
import { sendMessage } from "@/components/alert";
import { EditPostPageProps, PostInfoInterface } from "@/types/post-interface";
import { useAppSelector } from "@/Utils/reduxHelpers/useAppSelector";

const EditPostPage: FunctionComponent<EditPostPageProps> = ({ postInfo }) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);
  
  const [editForm, setEditForm] = useState<PostInfoInterface>({
    ...postInfo
  });

  useEffect(() => {
    if (!user?.id) {
      router.push("/register")
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await httpInstance.put(`post/${postInfo.id}`, editForm);
      if (response.status >= 200 && response.status < 300) {
        router.push("/");
        sendMessage({
          type: "success",
          title: `Gönderiniz başarıyla düzenlendi.`,
        });
      }
    } catch (error) {
      sendMessage({
        type: "error",
        title: `Gönderiniz düzenlenemedi: ${error}`,
      });
    } 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gönderiyi Düzenle</h1>
      <form>
        <div className={styles.formGroup}>
          <label className={styles.label}>Fotoğraf Linki</label>
          <input
            type="text"
            name="image"
            value={editForm.image}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>İçerik</label>
          <textarea
            name="text"
            value={editForm.text}
            onChange={handleInputChange}
            className={`${styles.input} ${styles.textarea}`}
          />
        </div>
        <div className={styles.formGroup}>
          <button type="button" onClick={handleSaveChanges} className={styles.button}>
          Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;

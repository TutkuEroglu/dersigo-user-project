import { FunctionComponent, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { httpInstance } from "@/config/axios.config";
import EditUserModal from "@/components/editUserModal";
import { useRouter } from "next/router";
import { sendMessage } from "@/components/alert";
import { usePostActions } from "@/Utils/postHelpers/deletePost";
import PostItem from "@/components/PostItem";
import Navbar from "@/components/navbar";
import { PostInfoInterface, ProfilePageViewProps } from "@/types/post-interface";
import { User } from "@/types/user-interface";
import { useAppSelector } from "@/Utils/reduxHelpers/useAppSelector";
import { useAppDispatch } from "@/Utils/reduxHelpers/useAppDispatch";
import { filterPosts } from "@/redux/actions/Posts";
import { EditUser, logout } from "@/redux/actions/Auth/authActions";
import { convertDate } from "@/Utils/dateHelpers/convertDate";
import React from "react";

const ProfilePageView: FunctionComponent<ProfilePageViewProps> = ({ userInfo, postInfo }) => {
  const dispatch = useAppDispatch();
  const { handleDeletePost } = usePostActions();
  const route = useRouter();
  const user = useAppSelector((state) => state?.user);
  const {data: posts} = useAppSelector((state) => state?.posts);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.id && userInfo?.id) {
      setLoading(false);
    }
  }, [user, userInfo]);

  const pageTitle = useMemo(
    () => `Profile - ${userInfo.firstName} ${userInfo.lastName}`,
    [userInfo]
  );

  const handleSearch = (term: string) => {
    dispatch(filterPosts(term));
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveEdit = async (editedData: Partial<User>) => {
    try {
      const userId = userInfo.id;
      const url = `/user/${userId}`;
      const dataToSend = {
        firstName: editedData.firstName,
        lastName: editedData.lastName,
      };
      const response = await httpInstance.put(url, dataToSend);

      if (response.status === 200) {
        dispatch(EditUser(dataToSend));
        sendMessage({
          type: "success",
          title: `Profiliniz başarıyla güncellendi`,
        });
      }
      return editedData;
    } catch (error) {
      sendMessage({
        type: "error",
        title: `Profiliniz güncellenemedi: ${error}`,
      });
    } finally {
      handleCloseEditModal();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await httpInstance.delete(`/user/${userId}`);
      if (response.status === 200) {
        dispatch(logout());
        route.push("/register");
        sendMessage({
          type: "success",
          title: `Profil başarıyla silindi.`,
        });
        return userId;
      }
    } catch (error) {
      sendMessage({
        type: "error",
        title: `Profiliniz silinemedi: ${error}`,
      });
    }
  };

  return (
    <>
    <Head>
        <title>{pageTitle}</title>
      </Head>
    {isLoading ? <div>loading</div> : 
      <section>
        <Navbar id={user?.id} onSearch={handleSearch}/>
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          userInfo={userInfo}
          onSave={handleSaveEdit}
        />
        <div className={styles.PageContainer}>
          <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              {user?.id == userInfo?.id && (
                <div className={styles.profileSettings}>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Ayarlar
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleOpenEditModal}
                        >
                          Düzenle
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() => handleDeleteUser(userInfo.id)}
                        >
                          Sil
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              <div className={styles.profilePictureHeaderWrapper}>
                <Image
                  src={userInfo.picture || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                  alt="Profil Fotoğrafı"
                  className={styles.profileHeaderPicture}
                  width={40}
                  height={40}
                />
              </div>
              <div className={styles.profileInfoHeader}>
                <h1>
                  {user?.id == userInfo?.id
                    ? `${user?.firstName} ${user?.lastName}`
                    : `${userInfo?.firstName} ${userInfo?.lastName}`}
                </h1>
                <p>
                  {userInfo?.location?.city}, {userInfo?.location?.country}
                </p>
              </div>
            </div>
            <div className={styles.userInfo}>
              <p>
                <strong>Email:</strong>{" "}
                {user?.id == userInfo?.id ? `${user?.email}` : `${userInfo?.email}`}
              </p>
              <p className={styles.userRegisterInfo}>
                {convertDate(userInfo?.registerDate)} tarihinden beri kayıtlı
              </p>
            </div>
          </div>

          <h2 className={styles.userPosts}>Gönderiler</h2>
          {posts?.map((post: PostInfoInterface) => (
            <React.Fragment key={post.id}>
            {userInfo?.id == post?.owner?.id  && 
            <PostItem 
              key={post.id} 
              post={post} 
              isOwner={user?.id === post.owner.id} 
              onDeletePost={handleDeletePost}
            /> }
            </React.Fragment>
          ))} 
        </div>
      </section>
      }
    </>
  );
};

export default ProfilePageView;

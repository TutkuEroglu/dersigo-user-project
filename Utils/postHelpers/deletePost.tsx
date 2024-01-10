import { httpInstance } from "@/config/axios.config";
import { sendMessage } from "@/components/alert";
import { useAppDispatch } from "../reduxHelpers/useAppDispatch";
import { deletePosts } from "@/redux/actions/Posts";

export const usePostActions = () => {
  const dispatch = useAppDispatch();

  const handleDeletePost = async (postId: string) => {
    try {
      const response = await httpInstance.delete(`/post/${postId}`);
      if (response.status === 200) {
        dispatch(deletePosts(postId));
        sendMessage({
          type: "success",
          title: `Gönderiniz başarıyla silindi.`,
        });
      }
    } catch (error) {
      sendMessage({
        type: "error",
        title: `Gönderiniz silinemedi: ${error}`,
      });
    }
  };

  return { handleDeletePost };
};

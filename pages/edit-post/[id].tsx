import { GetServerSideProps } from "next";
import EditPostPage from "@/screens/editPost";
import { httpInstance } from "@/config/axios.config";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  try {
    const { id } = query;
    if (!id) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      }
    } else {
      const res = await httpInstance.get(`post/${id}`);
      return {
        props: { postInfo: res.data }
      }
    }
  } catch (e) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      }
    }
  }
}

export default EditPostPage;

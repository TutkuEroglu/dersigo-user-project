import { GetServerSideProps } from "next";
import TagPageView from "@/screens/tagPage";
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
      const res = await httpInstance.get(`tag/${id}/post`);
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

export default TagPageView;

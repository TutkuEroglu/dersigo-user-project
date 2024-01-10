import { GetServerSideProps } from "next";
import ProfilePageView from "@/screens/ProfilePage";
import { httpInstance } from "@/config/axios.config";

export const getServerSideProps : GetServerSideProps = async ({query}) => {
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
      const [userInfo, postInfo] = await Promise.all([
        httpInstance.get(`user/${id}`),
        httpInstance.get(`user/${id}/post`)
      ])

      return {
        props: {
          userInfo: userInfo?.data,
          postInfo: postInfo?.data
        }
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

export default ProfilePageView;
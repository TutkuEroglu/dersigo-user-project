import { GetServerSideProps } from "next";
import HomePageView from "@/screens/HomePage"
import { httpInstance } from "@/config/axios.config";

export const getServerSideProps:GetServerSideProps = async () => {

  const res = await httpInstance.get("post")

  return {
    props: {
      list: res?.data
    }
  }
}

export default HomePageView;
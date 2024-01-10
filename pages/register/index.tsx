import { GetServerSideProps } from "next";
import registerPageView from "@/screens/registerPage";

export const getServerSideProps:GetServerSideProps = async () => {

  return {
    props: {}
  }
}

export default registerPageView;
import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import { useRouter } from "next/router";
import styles from "@/styles/register.module.css";
import { httpInstance } from "@/config/axios.config";
import { sendMessage } from "@/components/alert";
import { NewUser } from "@/types/user-interface";
import { loginSuccess } from "@/redux/actions/Auth/authActions";
import { useAppDispatch } from "@/Utils/reduxHelpers/useAppDispatch";

const UserForm: FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [newUser, setNewUser] = useState<NewUser>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await httpInstance.post("/user/create", newUser);

      if (response.status >= 200 && response.status < 300) {
        dispatch(loginSuccess(response.data));
        router.push("/");
        sendMessage({
          type: "success",
          title: `Başarıyla kayıt olundu: ${newUser.firstName}`,
        });
      } else {
        sendMessage({
          type: "error",
          title: `Form gönderilirken bir hata oluştu`,
        });
      }
    } catch (error) {
      sendMessage({
        type: "error",
        title: `Form gönderilirken bir hata oluştu: ${error}`,
      });
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2 className={styles.registerHeader}>Yeni Kullanıcı Oluştur</h2>
      <form className={styles.registerFormWrapper} onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={newUser.firstName}
          onChange={handleChange}
          placeholder="İsim"
          className={styles.registerInput}
        />
        <input
          type="text"
          name="lastName"
          value={newUser.lastName}
          onChange={handleChange}
          placeholder="Soyisim"
          className={styles.registerInput}
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          placeholder="Email"
          className={styles.registerInput}
        />
        <button type="submit" className={styles.registerButton}>
          Kayıt Ol
        </button>
      </form>
    </div>
  );
};

export default UserForm;

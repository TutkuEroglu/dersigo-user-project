import React, { FunctionComponent } from "react";
import styles from "@/styles/Modal.module.css"
import { EditUserModalProps } from "@/types/user-interface";

const EditUserModal: FunctionComponent<EditUserModalProps> = ({
  isOpen,
  onClose,
  userInfo,
  onSave
}) => {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => { data[key] = value; });
    onSave(data);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Kullanıcıyı Düzenle</h2>
        <form onSubmit={handleSubmit}>
          <label>
            İsim:
            <input type="text" name="firstName" defaultValue={userInfo.firstName} />
          </label>
          <label>
            Soyisim:
            <input type="text" name="lastName" defaultValue={userInfo.lastName} />
          </label>
          <button type="submit">Kaydet</button>
        </form>
        <button className={styles.modalCloseButton} onClick={onClose}>İptal</button>
      </div>
    </div>
  );
};

export default EditUserModal;

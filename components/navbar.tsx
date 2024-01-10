import React, { useState, ChangeEvent, FunctionComponent } from 'react';
import { useRouter } from "next/router";
import styles from "@/styles/navbar.module.css";
import { NavbarProps } from '@/types/Global';

const Navbar: FunctionComponent<NavbarProps> = ({ id, onSearch }) => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearch(newValue);
    onSearch(newValue); 
  };

  const goToProfile = () => {
    router.push(`/user/${id}`);
  };

  const goToHome = () => {
    router.push(`/`);
  };
  
  return (
    <div className={styles.navbar}>
      <div className={styles.directHomePage} onClick={goToHome}>Anasayfa</div>
      <div className={styles.searchContainer}>
        <input type="text" placeholder="Ara..." className={styles.searchInput} value={search} onChange={handleChange} />
      </div>
      <div className={styles.settings} onClick={goToProfile}>
        Profil
      </div>
    </div>
  );
};

export default Navbar;
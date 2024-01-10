const checkWindow = typeof window !== "undefined";

export const setStorage = (key: string, value: any, type?: string) => {
  if (checkWindow) {
    if (type === "session") {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
};

export const getStorage = (key: string, type?: string) => {
  try {
    if (checkWindow) {
      let item;
      if (type === "session") {
        item = sessionStorage.getItem(key);
      } else {
        item = localStorage.getItem(key);
      }
      return item ? JSON.parse(item) : null;
    }
    return null;
  } catch (e) {
    return { error: e };
  }
};


export const removeStorage = (key: string, type?: string) => {
  if (checkWindow) {
    if (type === "session") {
      sessionStorage.removeItem(key);
    } else {
      localStorage.removeItem(key);
    }
  }
}
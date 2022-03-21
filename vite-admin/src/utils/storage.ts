interface P {
  [k: string]: string;
}

interface Storage extends P {
  username: string;
  password: string;
  token: string;
  isLogin: "true" | "false";
}

interface StorageExport {
  username: string;
  password: string;
  token: string;
  isLogin: boolean;
}

export const getStorageState = function (): StorageExport {
  return {
    username: localStorage.getItem("username") || "",
    password: localStorage.getItem("password") || "",
    token: localStorage.getItem("token") || "",
    isLogin: localStorage.getItem("isLogin") === "true" ? true : false,
  };
};

export const setStorageState = function (s: Storage) {
  for (let key in s) {
    localStorage.setItem(key, s[key]);
  }
};

export const clearStorageState = function () {
  setStorageState({
    username: "",
    password: "",
    token: "",
    isLogin: "false",
  });
};

export default {
  getState: getStorageState,
  setState: setStorageState,
};

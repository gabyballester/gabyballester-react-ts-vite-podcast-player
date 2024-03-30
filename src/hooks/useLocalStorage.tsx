import { Podcast } from "../types/index";

type SetItemProps = {
  key: string;
  dataToStore: StoredDataType;
};

type StoredDataType = {
  url: string;
  data: Podcast[];
  savedOn: Date;
};

export const useLocalStorage = () => {
  const setItem = ({ key, dataToStore }: SetItemProps) => {
    localStorage.setItem(key, JSON.stringify({ ...dataToStore }));
  };

  const getItem = (key: string): StoredDataType | null => {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    } else {
      try {
        return JSON.parse(item);
      } catch (error) {
        console.error(`Error on useLocalStorage - getItem: ${error}`);
        return null;
      }
    }
  };

  return {
    setItem,
    getItem,
  };
};

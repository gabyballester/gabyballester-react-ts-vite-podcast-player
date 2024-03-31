type SetItemProps<T> = {
  key: string;
  dataToStore: StoredDataType<T>;
};

type StoredDataType<T> = {
  url?: string;
  data: T;
  savedOn: Date;
};

export const useLocalStorage = <T,>() => {
  const setItem = ({ key, dataToStore }: SetItemProps<T>) => {
    localStorage.setItem(key, JSON.stringify({ ...dataToStore }));
  };

  const getItem = (key: string): StoredDataType<T> | null => {
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

import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ApiPodcastServiceResponse, Podcast } from "../../../types";
import { mapperPodcastServiceResponseToPodcast } from "../../../mappers/mapperPodcastServiceResponseToPodcast";
import { key } from "../../../constants/keys.contants";

export type StoredDataType = {
  data: Podcast[];
  savedOn: Date;
};

export const useFetchPodcastList = (url: string) => {
  const { getItem, setItem } = useLocalStorage();
  const [data, setData] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const expirationTime = 1000 * 60 * 60 * 24 * 1; // 1 day

  useEffect(() => {
    const getFetch = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = (await response.json()) as ApiPodcastServiceResponse;
        const mappedData = mapperPodcastServiceResponseToPodcast(data);
        setData(mappedData);
        setItem({
          key: key.podcastList,
          dataToStore: {
            data: mappedData,
            savedOn: new Date(),
          },
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const storedData = getItem(key.podcastList);
    if (storedData && storedData.savedOn) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - new Date(storedData.savedOn).getTime();
      const remainingTime = expirationTime - elapsedTime;
      if (remainingTime > 0) {
        setData(storedData.data);
      } else {
        getFetch();
      }
    } else {
      getFetch();
    }
  }, [url]);

  return {
    data,
    isLoading,
  };
};

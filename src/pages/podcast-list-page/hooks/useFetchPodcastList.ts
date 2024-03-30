import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ApiPodcastServiceResponse, Podcast } from "../../../types";
import { mapperPodcastServiceResponseToPodcast } from "../../../mappers/mapperPodcastServiceResponseToPodcast";
import { key } from "../../../constants/keys.constants";

export const useFetchPodcastList = (url: string) => {
  const { getItem, setItem } = useLocalStorage();
  const [data, setData] = useState<Podcast[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const expirationTime = 1000 * 60 * 60 * 24 * 1; // 1 day in milliseconds

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData =
          (await response.json()) as ApiPodcastServiceResponse;
        const mappedData = mapperPodcastServiceResponseToPodcast(responseData);

        setData(mappedData);
        setItem({
          key: key.podcastList,
          dataToStore: {
            url,
            data: mappedData,
            savedOn: new Date(),
          },
        });
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    const storedData = getItem(key.podcastList);

    if (storedData && storedData.url === url) {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - new Date(storedData.savedOn).getTime();
      const remainingTime = expirationTime - elapsedTime;

      if (remainingTime > 0) {
        setData(storedData.data);
      } else {
        fetchData();
      }
    } else {
      fetchData();
    }
  }, [url]);

  return {
    data,
    isLoading,
  };
};

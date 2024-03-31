import { useEffect, useState } from "react";
import { useLocalStorage } from ".";
import type { ApiPodcastResponse, Podcast } from "../types";
import { mapperPodcastsResponseToPodcasts } from "../mappers";
import { expirationTime, key } from "../constants";

export const useFetchPodcastList = () => {
  const { getItem, setItem } = useLocalStorage<Podcast[]>();
  const [data, setData] = useState<Podcast[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const url = `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);

        if (!response.ok) {
          console.log("useFetchPodcastList: Network response was not ok");
          throw new Error("useFetchPodcastList: Network response was not ok");
        }

        const responseData = (await response.json()) as ApiPodcastResponse;
        const mappedPodcastList = mapperPodcastsResponseToPodcasts(responseData);

        setData(mappedPodcastList);
        setItem({
          key: key.podcastList,
          dataToStore: {
            url,
            data: mappedPodcastList,
            savedOn: new Date(),
          },
        });
      } catch (error) {
        console.error(`useFetchPodcastList: Error fetching data: ${error}`);
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

import { useEffect, useState } from "react";
import { useLocalStorage } from "../../../hooks";
import type { ApiEpisodesResponse, Episode, Podcast } from "../../../types";
import { mapperEpisodesResponseToEpisodes } from "../../../mappers";
import { expirationTime, key } from "../../../constants";

type Props = {
  podcastDetail: Podcast;
};

export const useFetchEpisodeList = ({ podcastDetail }: Props) => {
  const { getItem, setItem } = useLocalStorage<Episode[]>();
  const [data, setData] = useState<Episode[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const url = `https://itunes.apple.com/lookup?id=${podcastDetail?.id}&media=podcast&entity=podcastEpisode`;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          console.log("useFetchEpisodeList: Network response was not ok");
          throw new Error("useFetchEpisodeList: Network response was not ok");
        }

        const responseData = (await response.json()) as ApiEpisodesResponse;
        const mappedEpisodeList = mapperEpisodesResponseToEpisodes(responseData);

        setData(mappedEpisodeList);
        setItem({
          key: key.episodeList + podcastDetail?.id,
          dataToStore: {
            url,
            data: mappedEpisodeList,
            savedOn: new Date(),
          },
        });
      } catch (error) {
        console.error(`useFetchEpisodeList: Error fetching data: ${error}`);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    const storedData = getItem(key.episodeList + podcastDetail?.id);

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

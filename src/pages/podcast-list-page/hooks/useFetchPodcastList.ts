import { useEffect, useState } from "react";
import { ApiPodcastServiceResponse, Podcast } from "../../../types";
import { mapperPodcastServiceResponseToPodcast } from "../../../mappers/mapperPodcastServiceResponseToPodcast";

export const useFetchPodcastList = (url: string) => {
  let abortController = new AbortController();

  const [data, setData] = useState<Podcast[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  try {
    const getFetch = async () => {
      setIsLoading(true);

      const response = await fetch(url, {
        method: "GET",
        signal: abortController.signal,
      });
      const data = (await response.json()) as ApiPodcastServiceResponse;
      const mappedData = mapperPodcastServiceResponseToPodcast(data);
      setData(mappedData);
      setIsLoading(false);
    };

    useEffect(() => {
      getFetch();
    }, [url]);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Fetch succeeded!");
  }

  return {
    data,
    isLoading,
  };
};

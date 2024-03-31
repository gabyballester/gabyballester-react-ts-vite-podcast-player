import type { ApiEpisodesResponse, Episode } from "../types";

export const mapperEpisodesResponseToEpisodes = (
  podcastServiceResponse: ApiEpisodesResponse
): Episode[] => {
  return podcastServiceResponse.results
    .filter((result) => result.wrapperType === "podcastEpisode")
    .map((episode) => ({
      id: episode.trackId,
      title: episode.trackName,
      description: episode.description,
      audio: episode.previewUrl,
      releaseDate: new Date(episode.releaseDate),
      duration: episode.trackTimeMillis,
      image: episode.artworkUrl160,
    }));
};

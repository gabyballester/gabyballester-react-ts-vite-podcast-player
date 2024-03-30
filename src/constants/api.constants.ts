export const api = {
  baseUrl: "https://itunes.apple.com",
  endpoint: {
    podcastList: ({ limit }: { limit: number }) =>
      `/us/rss/toppodcasts/limit=${limit}/genre=1310/json`,
  },
};

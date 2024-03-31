export const containsHTML = (text: string) => {
  const htmlPattern = /<[a-z][\s\S]*>/i;
  return htmlPattern.test(text);
};

export const cacheFetch = (fetcher: () => any) => {
  let jsonData: any;
  return async () => {
    if (jsonData) {
      return jsonData;
    }
    try {
      const data = await fetcher();
      jsonData = data;
      return data;
    } catch (e) {
      return null;
    }
  };
};

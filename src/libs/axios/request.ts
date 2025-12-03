import API from './axiosInstance';

export const globalGetRequest = async ({ url }: { url: string }) => {
  const res = await API.get(url);
  return res.data;
};

export const globalPostRequest = async ({
  url,
  data,
}: {
  url: string;
  data: any;
}) => {
  const res = await API.post(url, { ...data, expiresInMins: 30 });
  return res.data;
};
export const globalPutRequest = async ({
  url,
  data,
}: {
  url: string;
  data: any;
}) => {
  const res = await API.put(url, data);
  return res.data;
};

export const globalDeleteRequest = async ({ url }: { url: string }) => {
  const res = await API.delete(url);
  return res.data;
};

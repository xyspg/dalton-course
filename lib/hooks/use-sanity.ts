import { createClient } from "next-sanity";

export const useSanity = async (query: string) => {
  const client = createClient({
    projectId: "fbgv2m2h",
    dataset: "production",
    apiVersion: "2023-07-28",
    useCdn: false,
  });
  const res = await client.fetch(query);

  return res;
};

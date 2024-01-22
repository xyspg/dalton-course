import { createClient } from "next-sanity";

export default createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-19",
  useCdn: process.env.NODE_ENV === 'production',
});

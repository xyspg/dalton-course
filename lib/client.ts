import { createClient } from "next-sanity";

export default createClient({
  projectId: "fbgv2m2h",
  dataset: "production",
  apiVersion: "2023-07-20",
  useCdn: process.env.NODE_ENV === "production",
});

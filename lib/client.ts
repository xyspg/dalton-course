import { createClient } from "next-sanity";

export default createClient({
  projectId: "fbgv2m2h",
  dataset: "production",
  apiVersion: "2024-01-19",
  useCdn: false,
});

import { createClient } from "next-sanity";

export default createClient({
  projectId: "fbgv2m2h",
  dataset: "production",
  apiVersion: "2023-08-17",
  useCdn: process.env.NODE_ENV === "development" ? false : true,
});

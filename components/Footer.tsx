import React from "react";
import { client } from "@umami/api-client";


const getActiveUsers = async () => {
  const id = process.env.NEXT_PUBLIC_WEBSITE_ID;
  const token = process.env.UMAMI_TOKEN;
  if (!id || !token) return null;
  const requestOptions: RequestInit = {
    headers: { Authorization: `Bearer ${token}` },
    redirect: "follow",
    next: {
      revalidate: 60
    }
  };
  const response = await fetch(
    "https://analytics.xyspg.moe/api/websites/2d67dea1-d9b6-46a6-bcde-02f612591fdf/active",
    requestOptions
  );
  const data = await response.json();
  const activeUsers = data[0].x;
  return activeUsers;
};

const Footer = async () => {
  const activeUsers = await getActiveUsers();

  return (
    <div className="text-xs text-neutral-600">
      <hr className="py-1 my-2" />
      <p>Current Visitors: {activeUsers}</p>
      <p>
        The information in this website may be subject to change due to various
        circumstances. Dalton Academy reserves the right of final interpretation
        of this guide.
      </p>
      <p>
        If you find information missing or mismatch with official document,
        please contact{" "}
        <a
          href="mailto:support@bdfz.app"
          className="text-indigo-700 cursor-pointer"
        >
          support@bdfz.app
        </a>{" "}
      </p>
    </div>
  );
};

export default Footer;
